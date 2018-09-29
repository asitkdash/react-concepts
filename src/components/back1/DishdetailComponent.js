import React, { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        const commentsList = comments.map((comment) => {
            return (
                <div key={comment.id} className="list-unstyled">
                    <Media className="row">{comment.comment}</Media>
                    <Media className="row">-- {comment.author} , {comment.date}</Media>
                </div>
            )
        });

        return (
            <div>
                <h4>Comments</h4>
                <Media list className="list-unstyled">
                    {commentsList}
                </Media>
            </div>

        );
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }

}

export default DishDetail;