import { useRouter } from 'next/router'

export function usePathValidate() {
  const router = useRouter();

  const isHomepage = router.asPath === "/" || router.route === "/rooms/[id]";
  const isFloating = router.asPath === "/floatingpointer";
  const isSignin = router.asPath === "/" || router.asPath === "/rooms";

  return { isHomepage, isFloating, isSignin }
}
