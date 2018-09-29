import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

    }

    renderComments(dish) {
        if (dish != null) {
            const comment = dish.comments.map((comm) => {
                return (
                    <li key={comm.id} >
                        <p>{comm.comment} <br />
                            -- {comm.author}, {comm.date}
                        </p>
                    </li>
                );
            }
            );
            return (
                <Card>
                    <CardBody>
                        <CardTitle><h4>Comments</h4></CardTitle>
                        <CardText>{comment}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div></div>
            );
        }

    }

    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    render() {

        return (
            <div className="row">

                <div className="col-6 col-md-5 col-sm-12 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-6 col-md-5 col-sm-12 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        ); 
                  
    }
}

export default DishDetail;