import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderDish(dish) {
    if(dish != null) {
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText> {dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

  renderComments(comments) {

    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            <li>{comments.map ((value) => value.comment+'--'+value.author+value.date)}</li>
          </ul>
        </div>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

 renderNewComments(dish) {

   if (dish != null) {
     console.log(dish.comments);
     const commentList = dish.comments.map((comm) => {
       return(
         <div className="container">
           <ul key={comm.id} className="list-unstyled">
            <li className="row">
              <p> {comm.comment} <br />
                -- {comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}
              </p>
            </li>
           </ul>
         </div>
       );
     }
    );

    return (
      <div>
        <h4>Comments</h4>
        {commentList}
      </div>
    );
   }
   else {
     return(
       <div></div>
     );
   }
 }

  render() {

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderNewComments(this.props.selectedDish)}
        </div>
        {/*this.renderComments(dishComments)*/}
      </div>
    );
  }
}

export default DishDetail;
