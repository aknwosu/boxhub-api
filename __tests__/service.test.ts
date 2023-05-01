import { Request, Response } from 'express';
import { getOrders } from '../src/service';
import Orders from '../src/models';

jest.mock('../src/models', () => {
    return {
        __esModule: true,
        default: {
            find: jest.fn().mockReturnValue({
                sort: jest.fn().mockReturnValue(
                    [
                        {
                            "id": "JMB007",
                            "created": "2021-05-05",
                            "status": "pending",
                            "customer": "James B.",
                            "sku": "JX-20-ST-NEW",
                            "photo": "https://store.boxhub.com/media/catalog/product/cache/a573a389a04b7edc268a8a9eac02fd84/2/0/20ft_cw_16_1_1_3.jpg",
                            "condition": "new",
                            "size": "20ft",
                            "type": "standard",
                            "origin_address": "120 Gun Club Rd, Jacksonville, FL 32218",
                            "shipping_address": "4550 NE 94 Pl, Bronson, FL 32621"
                        },
                        {
                            "id": "GHK523",
                            "created": "2021-05-01",
                            "status": "pending",
                            "customer": "María Hill",
                            "sku": "JX-45-HC-CWO",
                            "photo": "https://store.boxhub.com/media/catalog/product/cache/a573a389a04b7edc268a8a9eac02fd84/4/5/45ft_cw_12_1_2.jpg",
                            "condition": "cargo-worthy",
                            "size": "45ft",
                            "type": "high-cube",
                            "origin_address": "120 Gun Club Rd, Jacksonville, FL 32218",
                            "shipping_address": "868 Blanding Blvd 117, Orange Park, FL 32065"
                        }
                    ]
                )
            }),
        }
    }
});

describe('Service', () => {
    it('should return value', async () => {
        const request = {
            query: {
                status: 'pending',
                condition: 'new',
                size: 'standard',
                type: 'mini'
            }
        } as Request;
        const response = {
            status: jest.fn().mockReturnValue({
                json: jest.fn(),
                send: jest.fn()
            })
        } as Response;

        await getOrders(request, response);

        expect(response.status).toHaveBeenCalledTimes(1)
        expect(response.status().json).toHaveBeenCalledTimes(1)
    })

    it('should call response status with error message', async () => {
        const request = {
            query: {
                status: 'pending',
                condition: 'new',
                size: 'standard',
                type: 'mini'
            }
        } as Request;
        const response = {
            status: jest.fn().mockReturnValue({
                json: jest.fn(),
                send: jest.fn()
            })
        } as Response;

        Orders.find().sort = jest.fn().mockRejectedValue("error occured")

        await getOrders(request, response);

        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.status().send).toHaveBeenCalledWith('Error: error occured')
    });
})