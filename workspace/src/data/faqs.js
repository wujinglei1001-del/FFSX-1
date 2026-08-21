import { ffaxFaqCategories } from 'data/ffax-faqs';
import paths from 'routes/paths';

export const faqCategories = ffaxFaqCategories.map((category, index) => ({
  id: index + 1,
  get subheader() {
    return category.title;
  },
  slug: category.id,
  url: `${paths.faq}/${category.id}`,
  items: category.items,
}));
