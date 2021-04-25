export default function useTheme() {
  return sessionStorage.getItem('theme') || '#035de8';
}
