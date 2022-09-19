import { expect } from 'chai'
import { deleteAxios, getAxios, postAxios } from './axios'

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
    
    describe('DELETE', () => {
        it('User successfully deleted', async () => {
            expect(await deleteAxios('/user/Adandor')).to.equal(200)
        })
    })
})