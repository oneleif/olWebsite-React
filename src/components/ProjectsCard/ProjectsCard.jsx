import React from 'react'
import Card from '../Objects/Card/Card'
import CardContent from '../Objects/Card/CardContent'
import CardFooter from '../Objects/Card/CardFooter'
import Tag from '../Tag/Tag'

export default function ProjectsCard({ card }) {
    return (
        <Card>
            <CardContent>
            <img src={card.img} alt={card.name}></img>
            <h4>{card.name}</h4>
            <h3>{card.type}</h3>
            <p>{card.details}</p>
            </CardContent>
            <CardFooter>
                <div className='card-tag-container'>
                    {card.tags.map((tag,index)=>(
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </div>
            </CardFooter>
        </Card>

)}