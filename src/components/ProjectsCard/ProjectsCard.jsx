import React from 'react'
import Card from '../Objects/Card/Card'
import CardContent from '../Objects/Card/CardContent'
import CardFooter from '../Objects/Card/CardFooter'
import Tag from '../Tag/Tag'
import DefaultProjectImg from '../../assets/DefaultProjectImage/justoneleif_transparent.png'
import CardTagContainer from '../Objects/Card/CardTagContainer';

export default function ProjectsCard({ project }) {
	/************************************
	 * Render
	 ************************************/

	return (
    <Card className='projects-card'>
			<CardContent>
				<img src={project?.img ? project.img : DefaultProjectImg} alt={project.name}></img>
				<h4>{project.name}</h4>
				<h3>{project.type}</h3>
				<p>{project.details}</p>
			</CardContent>
    <CardFooter>
			<CardTagContainer>
				{/* // TODO: calculate tags to show based off the width of the view */}
				{project.tags.map((tag, index) => (
					<Tag key={index}>{tag}</Tag>
				))}
			</CardTagContainer>
    </CardFooter>
    </Card>
	);
}
