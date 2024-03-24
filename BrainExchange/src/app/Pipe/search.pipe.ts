import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../Interfaces/categoryInterface';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(Category: Category[], name: string): Category[] {
    if (!Category || name == '') {
      return Category;
    }

    const filtered: Category[] = [];

    for (let category of Category) {
      if (category.categoryname.toLowerCase().includes(name.toLowerCase())) {
        filtered.push(category);
        // If you only want to find the first matching item, you can return here
        return [category];
      }
    }

    return filtered;
  }
}
