import { Item } from 'src/types/item';

export const sortItems = (type: string, items: Item[]): Item[] => {
  if(type === "rated") {
    return items.sort((a, b) => b.rating - a.rating);
  }
  if(type === "saved") {
    return items.sort((a, b) => b.saves - a.saves);
  }
  if(type === "viewed") {
    return items.sort((a, b) => b.views - a.views);
  }
  if(type === "newest") {
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  if(type === "oldest") {
    return items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
  if(type === "a-z") {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }
  if(type === "z-a") {
    return items.sort((a, b) => b.name.localeCompare(a.name));
  }
  return items;
};

export const filterItems = (currNameSearch: string, currLabelSearch: string, items: Item[]) => {
  return items.filter(value => {
    const byName = !currNameSearch || (value.name.toLowerCase().includes(currNameSearch.toLowerCase()) || value.description.toLowerCase().includes(currNameSearch.toLowerCase()));
    const byLabel = !currLabelSearch || value.labels.some(label => label.toLowerCase().includes(currLabelSearch.toLowerCase()));
    return byName && byLabel;
  });
};