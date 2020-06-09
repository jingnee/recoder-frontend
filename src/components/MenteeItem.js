import React from 'react';
import ForwardIcon from '@material-ui/icons/Forward';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = theme => ({
    root: {
        maxWidth: 400,
    },
    content: {
        margin: 10
    }
})

class MenteeItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            language : '',
            open: false,
        }
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

     handleClickOpen = () => {
        this.setState({open:true});
      };
    
    handleClose = () => {
        this.setState({open:false});
      };

    menteeDelete = () => {
        const url=`http://59.29.224.144:30000/users/mentor/${this.props.mentee.menteeId}`
        axios.delete(url)
            .then(response=>{
                console.log(response)
            })
            .catch(error => alert('오류발생'))
    }

    componentDidMount(){
        const reviewLanguage = this.props.mentee.reviewLanguage;
        if(reviewLanguage === 0) this.setState({language:'Java'});
        else if(reviewLanguage === 1) this.setState({language: 'C'});
        else if(reviewLanguage === 2 )this.setState({language:'Cpp'});
        else this.setState({language:'기타'});
    }
    
    render(){
        const {classes} = this.props;
        return(                
            <TableRow style={{height:"3vh"}}>
                    <TableCell style={{height:"3vh"}}>{this.props.no+1}</TableCell>
                    <TableCell style={{height:"3vh"}}>{this.props.mentee.menteeNickname}</TableCell>
                    <TableCell style={{height:"3vh"}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.mentee.reviewCount}</TableCell>
                    <TableCell style={{height:"3vh"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.language}</TableCell>
                    <TableCell style={{height:"3vh"}}>
                       <Button
                        style={{backgroundColor:'#a80000', color:'white'}}
                        variant="contained"
                        startIcon={<ForwardIcon />}
                        onClick={this.handleClickOpen}>
                         강퇴하기
                        </Button>
                        <Dialog
                            open={this.state.open}
                            TransitionComponent={this.Transition}
                            keepMounted
                            onClose={this.handleClose}
                            >
                        <DialogTitle id="alert-dialog-slide-title" style={{color:'red'}}>{"경고"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {`${this.props.mentee.menteeNickname}님을 강퇴시키겠습니까?`}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.menteeDelete} variant="contained" color="primary">
                            예
                        </Button>
                        <Button onClick={this.handleClose} variant="outlined" color="primary">
                            취소
                        </Button>
                        </DialogActions>
                        </Dialog>
                    </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(useStyles)(MenteeItem);