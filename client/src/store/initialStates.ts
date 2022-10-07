import ObjectID from 'bson-objectid';

export const taskInit = {
    title: '',
    content: '',
    order: 0,
    col: 0,
    _id: new ObjectID()
}