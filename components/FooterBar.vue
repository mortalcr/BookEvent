<template>
    <footer class="footer bg-primary text-primary-content py-4">
        <div class="flex flex-col items-center justify-center text-center gap-4">
            <!-- Logo and Description -->
            <div class="flex flex-col items-center">
                <img src="/logo.svg" width="95" alt="Logo Rancho Fernández" />
                <div class="font-bold mt-1">
                    <p>Rancho Fernández Fernández.</p>
                    <p>Salón de eventos.</p>
                </div>
            </div>

            <!-- Social Media Links -->
            <div class="flex gap-4 justify-center">
                <a href="https://www.instagram.com/rancho.fernandez.eventos/" target="_blank" aria-label="Instagram"
                    class="transition-transform hover:scale-110">
                    <img src="/instagram.svg" alt="Instagram" class="w-8 h-8" />
                </a>
                <a href="https://www.facebook.com/p/Rancho-Familia-Fern%C3%A1ndez-Fern%C3%A1ndez-100063512606571/"
                    target="_blank" aria-label="Facebook" class="transition-transform hover:scale-110">
                    <img src="/facebook.svg" alt="Facebook" class="w-8 h-8" />
                </a>
            </div>

            <!-- Copyright -->
            <div>
                <p class="text-sm">
                    © {{ new Date().getUTCFullYear() }} | Todos los derechos reservados
                </p>
            </div>

            <!-- Terms and Conditions -->
            <div>
                <NuxtLink
                    class="text-black text-sm font-medium hover:underline"
                    target="_blank"
                    href="/terms"
                >
                    Términos y condiciones
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
