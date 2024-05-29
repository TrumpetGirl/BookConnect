import  router  from '@/router';

export const redirectTo = (path) => { router.push(path);}

export const goBack = () => { window.history.back();}
