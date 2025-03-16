export default defineNuxtRouteMiddleware((to) => {
    const localePath = useLocalePath();
    if (to.meta.localeRedirect && to.matched.length === 1 && !to.redirectedFrom) {
        return navigateTo(localePath(to.meta.localeRedirect));
    }
});
