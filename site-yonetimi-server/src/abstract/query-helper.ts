import { SelectQueryBuilder, FindConditions, MoreThanOrEqual, MoreThan, LessThan, LessThanOrEqual, FindManyOptions } from "typeorm";
import { SortDto } from "../hesap-hareketi/hesap-hareketi.controller";

export function buildWhereQuery<T>(query: SelectQueryBuilder<T>, filter: any[]): SelectQueryBuilder<T> {
    if (!filter || !filter.length) {
        return query;
    }
    if (typeof filter[0] === 'string') {
        let result = filterQuery<T>(query, filter[0], filter[1], filter[2]);
        return result;
    } else {
        for (const f of filter) {
            if (f.toString() === 'and') {
                continue;
            }
            query = buildWhereQuery(query, f);
        }
        return query;
    }
}
export function buildFindCondition<T>(filter: any[], condition = {}): FindConditions<T> {
    if (!filter || !filter.length) {
        return condition;
    }
    if (typeof filter[0] === 'string') {
        let result = findCondition<T>(condition, filter[0], filter[1], filter[2]);
        return result;
    } else {
        for (const f of filter) {
            if (f.toString() === 'and') {
                continue;
            }
            if (f === 'or') {
                continue;
            }
            buildFindCondition(f, condition);
        }
        return condition;
    }
}
export function buildOrder<T>(sort: SortDto[]): any {
    let sortResult = {};
    if (Array.isArray(sort)) {
        for (const s of sort) {
            sortResult[s.selector] = s.desc ? 'DESC' : 'ASC';
        }
    }
    return sortResult;
}
export function findCondition<T>(findCondition, columnName: string, clause: any, value: any): FindConditions<T> {
    value = new RegExp("^\d+$").test(value) ? value : `${value}`;
    switch (clause) {
        case '=':
            findCondition[columnName] = value;
            break;
        case '>=':
            findCondition[columnName] = MoreThanOrEqual(value);
            break;
        case '>':
            findCondition[columnName] = MoreThan(value);
            break;
        case '<':
            findCondition[columnName] = LessThan(value);
            break;
        case '<=':
            findCondition[columnName] = LessThanOrEqual(value);
            break;
        default:
            break;
    }
    return findCondition;
}
export function filterQuery<T>(query: SelectQueryBuilder<T>, columnName: string, clause: any, value: any): SelectQueryBuilder<T> {
    let queryObject = {};
    switch (clause) {
        case '=':
        case '>=':
        case '>':
        case '<':
        case '<=':
            value = new RegExp("^\d+$").test(value) ? value : `${value}`;
            let paramName = `${columnName}`;
            let includesParamsCount = query.expressionMap.wheres.filter(p => p.condition.includes(paramName)).length;
            paramName = `${columnName}_${includesParamsCount}`
            queryObject[paramName] = value;
            query = query.expressionMap.wheres.length ? query.andWhere(`${columnName} ${clause} :${paramName}`, queryObject) : query.where(`${columnName} ${clause} :${paramName}`, queryObject);
            break;
        default:
            break;
    }
    return query;
}