export interface MenuItem {
    title: string;
    icon: string;
    link?: string;
    isPro: boolean;
    children?: MenuItem[];
}
export const MAIN_MENU: MenuItem[] = [
    { link: 'overview', icon: 'rocket', title: 'Брифинг', isPro: false },
    {
        icon: 'appstore', title: 'Развитие', children: [
            { link: 'targets', icon: 'check-circle', title: 'Цели', isPro: false },
            { link: 'workbook', icon: 'solution', title: 'Конспекты', isPro: false },
            { link: 'qa', icon: 'question', title: 'Вопрос ответ', isPro: false },
        ], isPro: false
    },
    {
        icon: 'play-circle', title: 'Материалы', children: [
            { link: 'streams', icon: 'play-circle', title: 'Стримы', isPro: true },
            { link: 'workshops', icon: 'experiment', title: 'Воркшопы', isPro: true },
            { link: 'book', icon: 'book', title: 'Книга (главы)', isPro: true },
        ], isPro: false
    },
    { link: 'sources', icon: 'book', title: 'Исходники', isPro: true }
];
