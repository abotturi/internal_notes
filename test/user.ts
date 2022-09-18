import { expect } from 'chai'
import { getAxios, postAxios } from './axios'

describe("User Route Test", () => {
    describe('GET', () => {
        it('return existing user', async () => {
            expect(await getAxios('/user/Fintipenn')).to.equal(200)
        })
    })

    describe('POST', () => {
        it('Add new user successfully', async () => {
            expect(await postAxios('/user', {name: 'Adandor'})).to.equal(200)
        })
    })
})