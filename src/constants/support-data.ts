import CreditCard from '$lib/assets/creditcard.svg';
import Mail from '$lib/assets/email.svg';
import Phone from '$lib/assets/phone.svg';
import Calendar from '$lib/assets/calendar.svg';
import Pin from '$lib/assets/pin.svg';
import type { CardData } from '$appTypes/support-data.type';

export const supportedCards: CardData[] = [
    {
        picture: CreditCard,
        pictureAlt: 'credit card picture',
        title: 'Credit Card Number',
        description: 'A 16-digit number used to identify a credit card.',
        pattern: '1234-5678-9101-1121'
    },
    {
        picture: Mail,
        pictureAlt: 'mail picture',
        title: 'E-mail',
        description: 'A valid email address containing a username and domain.',
        pattern: 'someone@domain.com'
    },
    {
        picture: Phone,
        pictureAlt: 'phone picture',
        title: 'Phone Number',
        description: 'A phone number containing a country code and subscriber number.',
        pattern: '012-345-6789'
    },
    {
        picture: Calendar,
        pictureAlt: 'calendar picture',
        title: 'Date of Birth',
        description: 'A date represented by a day, month, and year.',
        pattern: '03/09/2545'
    },
    {
        picture: Pin,
        pictureAlt: 'pin picture',
        title: 'Address',
        description: 'A physical address containing location and postal details.',
        pattern: 'เลขที่บ้าน ซอย (optional) ถนน แขวงหรือตำบล เขตหรืออำเภอ จังหวัด รหัสไปรษนีย์'
    }
];