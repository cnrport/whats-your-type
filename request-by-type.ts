type TypeA = { 
    something: string;
    missing: number;
}

type TypeB = {
    field: string;
    missing: number;
    extra: boolean;
}

type Typess = 'theA' | 'theB';

type Mapping = {
    ['theA']: TypeA;
    ['theB']: TypeB;
}

type Query<T extends Typess = 'theA'> = {
    type: T;
    count: number;
}

export function getDataFromMapping<T extends keyof Mapping>(query : Query<T>): Promise<Mapping[T]> {
    return fetch(`https://example.com/${query.type}`).then(response => response.json()) as Promise<Mapping[T]>;
}


(await getDataFromMapping({
    type: 'theA',
    count: 1
})).missing; // OK

(await getDataFromMapping({
    type: 'theB',
    count: 1
})).extra; // OK