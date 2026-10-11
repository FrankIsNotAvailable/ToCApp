import type { Feature } from '$appTypes/feature.type';
import Pen from '$lib/assets/pen.svg';
	import Plus from '$lib/assets/plus.svg';
	import Lock from '$lib/assets/lock.svg';

export const features: Feature[] = [
    {
        title: 'Edit Data',
        icon: Pen,
        iconAlt: 'pen icon',
        description:
            'Seamlessly modify raw text records while preserving sensitive field structures. Instantly re-validate regular expressions to ensure compliance across updated entries.'
    },
    {
        title: 'Create Data',
        icon: Plus,
        iconAlt: 'plus icon',
        description:
            'Automatically detect and obscure sensitive Personal Data Protection Act (PDPA) information within raw text. Securely mask credit cards, emails, phone numbers, dates of birth, and addresses.'
    },
    {
        title: 'Secure Your Data',
        icon: Lock,
        iconAlt: 'lock icon',
        description:
            'Enterprise-grade database encryption for all user records. Beyond real-time pattern masking, sensitive data is strongly encrypted at rest to guarantee zero unauthorized access.'
    }
];