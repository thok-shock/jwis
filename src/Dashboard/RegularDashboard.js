import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Chart from 'chart.js'

import InventoryDisplay from '../Tables/InventoryDisplay'

function determineQuantityExpired(items) {
    var totalExpired = 0
    for (var i = 0; i < items.length; i++) {
        //console.log(i)
        var pastDate = new Date(items[i].itemExpiration)
        var currDate = new Date()

        if (pastDate.getTime() < currDate.getTime()) {
            totalExpired++;
        }
    }
    //console.log(totalExpired)
    return totalExpired
}

function expiryPie(items) {
    if (document.getElementById('pieChart')) {
        var pie = document.getElementById('pieChart')
        var myChart = new Chart(pie, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [determineQuantityExpired(items), items.length],
                    backgroundColor: [
                        'red',
                        'green'
                    ]
                }],
                labels: [
                    'Expired',
                    'Fresh'
                ]
            },
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 50,
                title: {
                    display: true,
                    text: 'Expired Items'
                }
            }
        })
    }
    
}

export default function RegularDashboard(props) {
    return <Container fluid>
        <Row>
            <Col>
            <h1>Welcome to JWIS</h1>
            <p>This website contains the inventory of the 1325 Randall Ct APT 4 pantry, refrigerator, and freezer. All information is up to date.</p>
            <div style={{height: '300px'}} className='m-3'>
            <canvas id='pieChart' >
                <p>Pie Chart Demonstrating Expired Items</p>
            </canvas>
            </div>
            {expiryPie(props.items)}
            <InventoryDisplay items={props.items} />
            </Col>
        </Row>

    </Container>
}