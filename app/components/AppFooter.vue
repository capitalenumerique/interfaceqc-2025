<template>
    <footer>
        <div class="footer-content">
            <div>
                <h2 class="newsletter-title">{{ t('infolettre') }}</h2>
                <p>{{ t('Pour tout savoir, l’infolettre est le secret le moins bien gardé.') }}</p>
                <PrimaryButton is-outlined>{{ t('m’inscrire') }}</PrimaryButton>
                <ul class="socials-list">
                    <li v-for="(social, i) in socials" :key="`social-${i}`">
                        <a class="social-link" :href="social.link" target="_blank" :aria-label="social.name">
                            <component :is="social.icon" width="32" />
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <IconDownArrow width="30" />
                <a href="mailto:info@interfaceqc.com">info@interfaceqc.com</a>
                <a href="#">partenaires</a>
                <a href="#">faq</a>
            </div>
        </div>
        <img class="logo" src="@/assets/svg/logo-with-star.svg" alt="interface" />
        <div>
            <template v-if="$config.public.commitTag || $config.public.commitShortSha">Version:</template>
            {{ $config.public.commitTag }}
            {{ $config.public.commitTag ? `(${$config.public.commitShortSha})` : $config.public.commitShortSha }}
        </div>
    </footer>
</template>

<script lang="ts" setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import IconDownArrow from '@/assets/svg/down-arrow.svg?component';
import IconFacebook from '@/assets/svg/facebook.svg?component';
import IconInstagram from '@/assets/svg/instagram.svg?component';
import IconLinkedin from '@/assets/svg/linkedin.svg?component';

const { t } = useI18n();

const socials = [
    {
        name: 'Facebook',
        link: 'https://www.facebook.com/interfaceqc',
        icon: IconFacebook,
    },
    {
        name: 'Instagram',
        link: 'https://www.instagram.com/interfaceqc',
        icon: IconInstagram,
    },
    {
        name: 'Linkedin',
        link: 'https://www.linkedin.com/company/interfaceqc/',
        icon: IconLinkedin,
    },
];
</script>

<style lang="postcss" scoped>
footer {
    background-color: var(--black-900);
    border-radius: 40px 40px 0 0;
    color: var(--brown-100);
}
.footer-content {
    padding: 80px 40px;
    @media (--medium) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
.newsletter-title {
    font-size: rem(36px);
    color: var(--yellow-200);
    margin-bottom: 16px;
    @media (--medium) {
        margin-bottom: 48px;
    }
}
.socials-list {
    list-style: none;
    display: flex;
    gap: 40px;
    padding: 0;
    margin: 0;
}
.social-link {
    color: var(--brown-100);
    transition: color var(--hover-transition);
    &:hover,
    &:focus {
        color: var(--yellow-200);
    }
}
.logo {
    width: 100%;
    max-width: none;
    min-height: 200px;
    object-fit: cover;
    object-position: 12%;
}
</style>

<i18n lang="json">
{
    "en": {
        "infolettre": "newsletter",
        "Pour tout savoir, l’infolettre est le secret le moins bien gardé.": "To know everything, the newsletter is the worst-kept secret."
    }
}
</i18n>
