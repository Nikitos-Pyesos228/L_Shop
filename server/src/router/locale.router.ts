import { Router } from 'express';

const router = Router();

const locales: any = {
  ru: { 
    catalog: "Каталог",
    basket: "Корзина",
    login: "Войти",
    register: "Регистрация",
    logout: "Выход",
    welcome: "Элитная коллекция L_SHOP",
    buy: "В корзину",
    details: "Подробнее",
    all_categories: "Все категории",
    add_success: "Добавлено в коллекцию!",
    login_required: "Нужна авторизация",
    reviews_count: "отзывов",
    suggestion: "Похоже, вы из Беларуси. Установить русский язык?",
    yes: "Да",
    no: "No, English"
  },
  en: { 
    catalog: "Catalog",
    basket: "Basket",
    login: "Login",
    register: "Sign Up",
    logout: "Logout",
    welcome: "L_SHOP Elite Collection",
    buy: "Add to Cart",
    details: "Details",
    all_categories: "All Categories",
    add_success: "Added to collection!",
    login_required: "Login required",
    reviews_count: "reviews",
    suggestion: "It looks like you are from Belarus. Switch to English?",
    yes: "English, please",
    no: "Оставить русский"
  }
};

router.get('/detect', (req: any, res) => {
  res.json({ country: "Беларуси", suggestedLang: 'ru' });
});

router.post('/set', (req: any, res) => {
  const { lang } = req.body;
  req.session.lang = lang; 
  res.json({ message: `Language set to ${lang}`, dictionary: locales[lang] });
});

router.get('/dictionary', (req: any, res) => {
  const lang = req.session.lang || 'ru';
  res.json(locales[lang]);
});

export default router; // ВАЖНО