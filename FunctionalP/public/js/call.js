import { faker } from 'https://esm.sh/@faker-js/faker';


export const ShitPosts = Object.freeze( Array.from(Array(3), _item => faker.lorem.sentences(3)) )
