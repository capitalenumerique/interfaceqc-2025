<template>
    <footer>
        <div class="footer-content">
            <div class="column">
                <h2 class="newsletter-title">{{ t('infolettre') }}</h2>
                <p class="newsletter-text">
                    {{ t('Pour tout savoir, l’infolettre est le secret le moins bien gardé.') }}
                </p>
                <PrimaryButton is-outlined>{{ t('m’inscrire') }}</PrimaryButton>
                <ul class="socials-list">
                    <li v-for="(social, i) in socials" :key="`social-${i}`">
                        <a class="social-link" :href="social.link" target="_blank" :aria-label="social.name">
                            <component :is="social.icon" width="32" />
                        </a>
                    </li>
                </ul>
            </div>
            <div class="column">
                <span class="column-icon"><IconDownArrow width="20" /></span>
                <ul class="column-list">
                    <li><a href="mailto:info@interfaceqc.com">info@interfaceqc.com</a></li>
                    <!-- @TODO: Ajout les vrais liens lorsque les pages existeront -->
                    <li><a href="#">partenaires</a></li>
                    <li><a href="#">faq</a></li>
                </ul>
            </div>
            <div class="column">
                <template v-if="archives.length > 1">
                    <span class="column-icon"><IconHexagon width="18" /></span>
                    <ul class="column-list">
                        <li v-for="(archive, i) in archives" :key="`archive-${i}`">
                            <a :href="`/programmation/${archive.year}`">
                                {{ t('édition {year}', { year: archive.year }) }}
                            </a>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
        <img class="logo" src="@/assets/svg/logo-with-star.svg" alt="interface" />
        <div class="credits-wrapper">
            <div class="credits">
                <span>
                    <a href="https://capitalenumerique.com/politique-de-confidentialite/" target="_blank">
                        {{ t('Politique de confidentialité') }}
                    </a>
                    | © Interface - Québec {{ new Date().getFullYear() }}. {{ t('Tous droits réservés.') }}
                </span>
                <span>
                    <template v-if="$config.public.commitTag || $config.public.commitShortSha">Version:</template>
                    {{ $config.public.commitTag }}
                    {{
                        $config.public.commitTag ? `(${$config.public.commitShortSha})` : $config.public.commitShortSha
                    }}
                </span>
            </div>
            <ul class="organizers">
                <li>
                    <a href="https://capitalenumerique.com/" target="_blank">
                        <img src="@/assets/img/capitale-numerique.png" alt="Capitale Numérique" />
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
import IconDownArrow from '@/assets/svg/down-arrow.svg?component';
import IconFacebook from '@/assets/svg/facebook.svg?component';
import IconHexagon from '@/assets/svg/hexagon.svg?component';
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

// @TODO: À dynamiser lorsqu'on aura déterminer la logique des archives
// et qu'il y aura au moins une édition passée
const archives = [
    {
        year: 2024,
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 320px));
    padding: 80px 16px 48px;
    max-width: 1240px;
    justify-content: space-between;
    gap: 48px 24px;
    @media (--small-only) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
            'first first'
            'second third';
    }
    @media (--medium) {
        padding: 80px 40px;
    }
}
.column {
    @media (--small-only) {
        &:first-child {
            grid-area: first;
        }
        &:nth-child(2) {
            grid-area: second;
        }
        &:nth-child(3) {
            grid-area: third;
        }
    }
}
.newsletter-title {
    font-size: rem(36px);
    color: var(--yellow-200);
    margin-bottom: 24px;
    @media (--large) {
        margin-bottom: 48px;
    }
}
.newsletter-text {
    margin-bottom: 32px;
}
.socials-list {
    list-style: none;
    display: flex;
    gap: 40px;
    padding: 0;
    margin: 48px 0 0;
}
.social-link {
    color: var(--brown-100);
    transition: color var(--hover-transition);
    &:hover,
    &:focus {
        color: var(--yellow-200);
    }
}
.column-icon {
    display: flex;
    align-items: center;
    height: rem(36px);
    svg {
        fill: var(--yellow-200);
    }
}
.column-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
    margin-top: 24px;
    font-size: rem(14px);
    @media (--large) {
        margin-top: 48px;
        font-size: rem(16px);
    }
    a {
        color: var(--brown-100);
        text-decoration: none;
        font-weight: 500;
        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
}
.logo {
    width: 100%;
    max-width: none;
    min-height: 200px;
    object-fit: cover;
    object-position: 12%;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--yellow-200);
    @media (--medium) {
        padding-bottom: 24px;
    }
}
.credits-wrapper {
    padding: 48px 16px 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 48px;
    @media (--medium) {
        padding: 40px;
        flex-direction: row;
    }
}
.credits {
    font-size: rem(12px);
    a {
        color: var(--brown-100);
        &:hover,
        &:focus {
            text-decoration: none;
        }
    }
}
.organizers {
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 32px;
    @media (--small-only) {
        order: -1;
    }
}
</style>

<i18n lang="json">
{
    "en": {
        "infolettre": "newsletter",
        "Pour tout savoir, l’infolettre est le secret le moins bien gardé.": "To know everything, the newsletter is the worst-kept secret.",
        "édition {year}": "{year} edition",
        "Tous droits réservés.": "All rights reserved."
    }
}
</i18n>
