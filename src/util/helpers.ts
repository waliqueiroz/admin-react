import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { store } from '../store';

export function showErrorMessages(error: AxiosError): void {
  let messages = '';

  if (error?.response?.data.errors) {
    // eslint-disable-next-line no-restricted-syntax
    for (const msg of Object.values(error.response.data.errors)) {
      messages += `${msg} \n`;
    }
  }

  Swal.fire({
    icon: 'error',
    title: error?.response?.data.message,
    text: messages,
    showConfirmButton: true,
  });
}

export function showSuccessMessage(message: string): void {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function hasPermission(permisson: string): boolean {
  const { user } = store.getState().auth;
  return user.permissions.indexOf(permisson) > -1;
}
