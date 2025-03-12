const CATEGORY_COLORS: Record<string, object> = {
    'Administration publique': { bg: 'var(--red-600)', text: 'var(--yellow-200)' },
    'Art numérique': { bg: 'var(--yellow-200)', text: 'var(--red-600)' },
    'Commerce': { bg: 'var(--pink-300)', text: 'var(--green-800)' },
    'Communication et marketing': { bg: 'var(--blue-700)', text: 'var(--orange-300)' },
    'Cybersécurité': { bg: 'var(--teal-600)', text: 'var(--color-white)' },
    'Design': { bg: 'var(--gray-900)', text: 'var(--pink-300)' },
    'Développement': { bg: 'var(--orange-300)', text: 'var(--blue-700)' },
    'Données': { bg: 'var(--color-white)', text: 'var(--teal-600)' },
    'Droit et numérique': { bg: 'var(--green-800)', text: 'var(--pink-300)' },
    'Entrepreneuriat technologique': { bg: 'var(--pink-300)', text: 'var(--gray-900)' },
    'ESG': { bg: 'var(--orange-300)', text: 'var(--gray-900)' },
    'Industrie 4.0': { bg: 'var(--teal-600)', text: 'var(--gray-900)' },
    'Innovation': { bg: 'var(--yellow-200)', text: 'var(--gray-900)' },
    'Intelligence artificielle': { bg: 'var(--green-800)', text: 'var(--yellow-200)' },
    'Keynote': { bg: 'transparent', text: 'var(--gray-900)' },
    'Numérique au service de l’environnement': { bg: 'var(--gray-900)', text: 'var(--yellow-900)' },
    'Technologie et gestion': { bg: 'var(--yellow-200)', text: 'var(--teal-600)' },
};

export function getCategoryColor(category: string): object {
    return CATEGORY_COLORS[category] || { bg: 'var(--red-600)', text: 'var(--yellow-200)' };
}
