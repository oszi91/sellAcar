import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useCRUD } from '../../../../../../contexts/CRUDContext';
import { useData } from '../../../../../../contexts/DataContext';

const ImagesInCarFormView = () => {
	const {
		dispatch,
		state: {
			car: { images, id}
		},
	} = useData();

	const {deleteImg, carDataToAdd} = useCRUD();

	const handleOnDragEnd = result => {
		if (!result.destination) return;

		const [reorderedImg] = images.splice(result.source.index, 1);
		images.splice(result.destination.index, 0, reorderedImg);

		dispatch({
			type: 'UPDATE_PHOTO_WHEN_ADD',
			payload: {
				images
			},
		});
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="imagesOrder" direction="horizontal">
				{provided => (
					<ul
						className="addCarForm__images"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{images.map(({ src }, index) => {
							return (
								<Draggable key={src} draggableId={src} index={index}>
									{provided => (
										<li
											className="addCarForm__images__item"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<img
												className="addCarForm__images__item__img"
												src={src}
											/>
											<div
												className="addCarForm__images__item__delete"
												onClick={() => deleteImg(src, id, carDataToAdd)}
											>
												<i className="fas fa-times"></i>
											</div>
										</li>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ImagesInCarFormView;
