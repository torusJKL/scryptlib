

import { assert, expect } from 'chai';
import { loadDescription } from './helper';
import { buildContractClass, VerifyError, buildTypeClasses } from '../src/contract';
import { Bool, Bytes, Int } from '../src/scryptTypes';



const { Person } = buildTypeClasses(loadDescription('state_desc.json'));


const Counter = buildContractClass(loadDescription('state_desc.json'));


describe('state_test', () => {


    it('should serializer state success', () => {
        const counter = new Counter(1000, new Person({
            isMale: false,
            age: 33,
            addr: new Bytes("68656c6c6f20776f726c6421")
        }));
        //counter.
        expect(counter.lockingScript.toASM().endsWith("OP_RETURN e803 68656c6c6f20776f726c6421 0 21 1300000001")).to.be.true;

        // udpate state
        counter.counter++;

        counter.some = new Person({
            isMale: true,
            age: 34,
            addr: new Bytes("1111")
        });

        expect(counter.lockingScript.toASM().endsWith("OP_RETURN e903 1111 OP_1 22 0900000001")).to.be.true;

    });


    it('should change state success', () => {

    });

    it('should deserializer state success', () => {

    });

})
