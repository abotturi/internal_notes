import { expect } from 'chai'
import { getAxios, postAxios } from './axios'

describe("Post Route Test", () => {
    describe('GET', () => {
        it('return all posts', async () => {
            expect(await getAxios('/post')).to.equal(200)
        })
    })

    describe('POST', () => {
        it('Add new post successfully', async () => {
            expect(await postAxios('/post', {name: 'Fintipenn', text: 'Hello'})).to.equal(200)
        })
    })
})