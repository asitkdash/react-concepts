import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

  function RenderDish({dish}) {
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

 function RenderNewComments({dish}) {

     const commentList = dish.comments.map((comm) => {
       return(
         <div key={comm.id} className="container">
           <ul  className="list-unstyled">
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

 const DishDetail = (props) => {
   if (props.selectedDish != null){
     return (
       <div className="container">
         <div className="row">
           <div className="col-12 col-md-5 m-1">
             <RenderDish dish = {props.selectedDish} />
           </div>
           <div className="col-12 col-md-5 m-1">
             <RenderNewComments dish = {props.selectedDish} />
           </div>
         </div>
       </div>
     );
   }
   else {
     return (
       <div></div>
     );
   }
  }

export default DishDetail;
