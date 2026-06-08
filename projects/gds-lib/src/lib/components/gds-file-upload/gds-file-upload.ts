import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UploadedFile {
  file: File;
  name: string;
  size: string;
  status: 'listo' | 'fallido';
}

export interface FileUploadError {
  code:
    | 'MAX_FILES'
    | 'MAX_SIZE'
    | 'INVALID_FORMAT'
    | 'INVALID_NAME';
}

@Component({
  selector: 'lib-gds-file',
  templateUrl: './gds-file-upload.html',
  styleUrls: ['./gds-file-upload.scss'],
  standalone: false
})

export class GdsFileUpload {
  @Input() title = '';
  @Input() body = '';
  @Input() maxFiles = 3;
  @Input() maxFileSize = 10 * 1024 * 1024;
  @Input() acceptedFileTypes = '.pdf,.png,.jpg,.jpeg';
  @Input() showStatus = true;
  @Input() uploadedFiles: UploadedFile[] = [];
  @Output() filesChange = new EventEmitter<File[]>();
  @Output() uploadError = new EventEmitter<FileUploadError>();
  private readonly formNamePattern = /[ $@&\/()]/;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const files = Array.from(input.files);
    const currentValidFiles = this.uploadedFiles.filter(
      file => file.status === 'listo'
    ).length;
    if (currentValidFiles + files.length > this.maxFiles) {
      this.uploadError.emit({
        code: 'MAX_FILES'
      });
      input.value = '';
      return;
    }

    files.forEach(file => {
      const errorCode = this.validateFile(file);
      if (errorCode) {
        this.uploadError.emit({
          code: errorCode
        });
        this.uploadedFiles.push({
          file,
          name: file.name,
          size: this.formatBytes(file.size),
          status: 'fallido'
        });
        return;
      }
      this.uploadedFiles.push({
        file,
        name: file.name,
        size: this.formatBytes(file.size),
        status: 'listo'
      });
    });
    this.emitFiles();
    input.value = '';
  }

  onDeleteClick(index: number): void {
    // Futuro:
    // abrir modal de confirmación para eliminar el archivo
    this.removeFile(index);
  }

  private removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.emitFiles();
  }

  private emitFiles(): void {
    this.filesChange.emit(
      this.uploadedFiles
        .filter(file => file.status === 'listo')
        .map(file => file.file)
    );
  }

  private validateFile(file: File): FileUploadError['code'] | null {
    if (this.formNamePattern.test(file.name)) {
      return 'INVALID_NAME';
    }
    if (file.size > this.maxFileSize) {
      return 'MAX_SIZE';
    }
    const allowedExtensions = this.acceptedFileTypes
      .split(',').map(ext => ext.trim().toLowerCase());
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!allowedExtensions.includes(fileExtension)) {
      return 'INVALID_FORMAT';
    }
    return null;
  }

  private formatBytes(bytes: number): string {
    if (!bytes) {
      return '0 Mb';
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mb`;
  }

  public get uploadIcon(): string {
    const hasError = this.uploadedFiles.some(
      file => file.status === 'fallido'
    );

    if (hasError) {
      return 'assets/icon_red.svg';
    }
    const hasSuccess = this.uploadedFiles.some( file => file.status === 'listo');
    if (hasSuccess) {
      return 'assets/file_upload_success.svg';
    }
    return 'assets/file_upload.svg';
  }
}
