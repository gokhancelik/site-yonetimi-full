import { Pipe, PipeTransform } from '@angular/core';
import { from, Observable, GroupedObservable } from 'rxjs';
import { groupBy } from 'rxjs/operators';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {

  transform(collection: Array<any>, property: string): Array<any> {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }
    // const grouped$ = from(collection).pipe(groupBy(d => d[property])); // .subscribe(console.log)
    // return grouped$;
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

}
