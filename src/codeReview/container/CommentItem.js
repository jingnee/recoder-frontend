import React, {useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from 'axios';

var comment_cmtId = 0;
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "1px solid grey",
    backgroundColor: '',
  },
  root1: {
    minWidth: 275,


  },
  content:{
    color: "coral",
    fontSize:14,
    paddingBottom: 5
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: 'coral',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CommentItem(props) {
  const classes = useStyles();
  const [open,setOpen]=React.useState(false);
  const [realOpen, setRealOpen]=React.useState(false);
  const [text, setText] = React.useState();
  const [nickname, setNickname] = React.useState();

  //댓글 : modal2
  const handleOpenContent = (e) => {
    comment_cmtId = e.target.value;
    setOpen(true);
  }
  const handleSubmit = () => {

    //console.log(this.state.text)
    const getUrl = document.location.href.split("/");
    const len = getUrl.length;
    console.log(text)
    console.log(props.nickname)
    const url = 'http://59.29.224.144:40000/comment/reply';
    axios.post(url, {
      cmtId: props.cmtId,
      replyContent: text,
      nickname: nickname,
    })
      .then(response => {
        console.log(response.data)

        window.location.href = `/review/${getUrl[len-1]}`
      }
      )
      .catch(error => {
        alert("다시 시도해 주십시오")
      })

  }

  const handleModal3Close = () => {
    setRealOpen(false)
  }

  const handleOpenRemove = (e) => {
    setRealOpen(true)
    comment_cmtId = e.currentTarget.value;
  }

  const handleChange = e => {
    setText(e.currentTarget.value);
  }

  const handleRemove = () => {  //정말로 삭제
    console.log(comment_cmtId)
    const form = new FormData();
    form.append('cmtId', comment_cmtId);
    const url = `http://59.29.224.144:40000/comment?cmtId=${comment_cmtId}`;
    axios.delete(url)
      .then(response => {
        console.log(response.data)
      }
      )
      .catch(error => {
        alert("다시 시도해 주십시오")
      })
    setRealOpen(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangeForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const state = JSON.parse(sessionStorage.getItem('state'));
        const url = `http://59.29.224.144:10000/users/${userData.id}`;
        axios.get(url)
         .then(response =>{
             if(state ==='mentee'){
             setNickname(response.data.menteeNickname)
             }
             else{
                setNickname(response.data.mentorNickname)
             }

        }) 
          .catch(error => {
            // alert("error")
            console.log(error);
          })


  }, []);

    return (
        <div>
            <Dialog open={realOpen} onClose={handleModal3Close} style={{margin:'10'}}>
                <div 
                // className="modal_content"
                >

                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  정말로 삭제하시겠습니까?  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <DialogActions>
                        <Button type="button" variant="contained"onClick={handleRemove} >삭제</Button>
                        <Button type="button" variant="contained" onClick={handleModal3Close}>취소</Button>
                    </DialogActions>
                </div>
                {/* <div className="modal_layer"></div> */}
            </Dialog>
            <Card className={classes.root} variant="outlined"style={{backgroundColor:`${props.myBackgroundColor}`,color : `${props.myColor}`}}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom style={{backgroundColor:`${props.myBackgroundColor}`,color : `${props.myColor}`}}> 
                        Line{' '} {props.cmt_line_number}<br />
                    </Typography>
                    <Typography className={classes.content} color="textSecondary" variant="h5" component="h2" style={{backgroundColor:`${props.myBackgroundColor}`,color : `${props.myColor}`}} >
                        &nbsp; {props.cmtCode}
                    </Typography>
                    <Typography className={classes.content} variant="body2" component="p" style={{color : "coral"}}>
                        {props.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" variant="contained" value={props.cmtId} onClick={handleOpenContent}>댓글</Button>
                    <Button size="small" color="secondary" variant="contained" value={props.cmtId} onClick={handleOpenRemove}>삭제</Button>
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>댓글</DialogTitle>

                <DialogContent>

                    <div style={{ height: "25vh", overflowY: 'scroll' }}>
                        <div style={{ ovpadding: 10, fontSize: 15 }}>{props.replys.map((reply, index) => {

                            return (<List className={classes.root1}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {reply.nickname}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={reply.replyContent} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                            );
                        })
                        }
                        </div>
                    </div>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        id="comment_txt"
                        margin="normal"
                        style={{ width: 400, wordBreak: "breakAll" }}
                        rows={3}
                        value={text}
                        onChange={handleChange}
                        placeholder="댓글 달기"
                    ></TextField>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>댓글달기</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>

            </Dialog>
        </div>
  );
}