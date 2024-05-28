import { useRouter } from 'vue-router';

export function redirectTo(path) {
  const router = useRouter();
  router.push(path);
}

export function goBack() {
  window.history.back();
}
