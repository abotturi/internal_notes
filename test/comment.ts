import { expect } from 'chai'
import { getAxios, postAxios } from './axios'

describe("Comment Route Test", () => {
    describe('GET', () => {
        it('return all comment', async () => {
            expect(await getAxios('/comment/1')).to.equal(200)
        })
    })

    describe('POST', () => {
        it('Add new comment successfully', async () => {
            expect(await postAxios('/comment', {name: 'Fintipenn', text: 'Hello', post: 1})).to.equal(200)
        })
    })
})