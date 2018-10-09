import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
  Breadcrumb, BreadcrumbItem, Button, Label, Row, Col,
  Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length > len);

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    //  So that is the effect of the change that you have made to your
      //application. So, when you submit the comment, you'll see that
      //the submission of the comment will trigger action to be sent
      //to your redux store, and then this action will result in the
      //comment being added into the comments part of the state of your
      //redux store, and then when the changes, then that will result
      //in the store emitting a change, and that will result in your
      //main component going and getting the updated state from the redux
      //store, and then the main component passes the new state to all
      //the chilled components, and then when you come down the RenderComments
      // component realizes that the comments part has changed,
      //so it will have to be rendered. So, react takes care of re rendering
      //that with new the comment added into the list there. So, now you see
      //how an action can trigger a change in the redux store and that immediately
      // gets reflected back into our react applications view there.
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div >
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pensil fa-lg"></span>Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody className="row row-content">
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12} className="col-12 col-sm-4">Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" name="rating" className="form-control col col-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12} className="col-12 col-sm-4">Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                     />
                 <Errors
                   className="text-danger"
                   model=".author"
                   show="touched"
                   messages={{
                     required: 'Required',
                     minLength: 'Must be greater than 2 chars',
                     maxLength: 'must be 15 characters or less'
                   }}
                 />
                 </Col>
               </Row>
               <Row className="form-group">
                   <Label htmlFor="comment" md={12}>Comment</Label>
                  <Col md={12}>
                   <Control.textarea model=".comment" id="comment" name="comment"
                       rows="6" className="form-control"></Control.textarea>
                  </Col>
               </Row>
               <Row className="form-group">
                  <Col md={12}>
                       <Button type="submit" color="primary">
                           Submit
                       </Button>
                  </Col>
               </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}




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

 function RenderComments({comments, addComment, dishId}) {

    if (comments != null) {
      const commentList = comments.map((comm) => {
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
          <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      );
    }
   }

 const DishDetail = (props) => {
   if (props.dish != null){
     return (
       <div className="container">
       <div className="row">
         <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
           <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
           <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
         </Breadcrumb>
         <div className="col-12">
           <h3>{props.dish.name}</h3>
           <hr />
         </div>
       </div>

         <div className="row">
           <div className="col-12 col-md-5 m-1">
             <RenderDish dish = {props.dish} />
           </div>
           <div className="col-12 col-md-5 m-1">
             <RenderComments comments = {props.comments}
                addComment={props.addComment}
                dishId={props.dish.id} />
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
