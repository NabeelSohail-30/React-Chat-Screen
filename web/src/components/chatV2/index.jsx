import { TextField, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import { Typography, Avatar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#e5e5e5",
  },

  messageScreen: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: "30%",
    margin: "auto",
    height: "100vh",
    alignItems: "center",
    border: "2px solid #383c96",
  },

  chatTitle: {
    marginBottom: "10px",
    backgroundColor: "#383c96",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "14px",
    justifyContent: "center",
  },

  chatTitleText: {
    marginLeft: "0px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
  },

  messageWindow: {
    width: "100%",
    margin: "auto",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    paddingBottom: "20px",
  },

  userMessageBaloon: {
    backgroundColor: "#b7badd",
    color: "#00000",
    borderRadius: "20px 20px 0 20px",
    padding: "10px 20px",
    margin: "10px 0",
    alignSelf: "flex-end",
    marginRight: "8px",
    fontSize: "18px",
    fontWeight: "600",
  },
  userMessage: {
    color: "#00000",
    alignSelf: "flex-end",
  },
  botMessageBaloon: {
    backgroundColor: "#383c96",
    color: "#fff",
    borderRadius: "20px 20px 20px 0",
    padding: "10px 20px",
    margin: "10px 0",
    alignSelf: "flex-start",
    marginLeft: "8px",
    fontSize: "18px",
    fontWeight: "600",
  },
  botMessage: {
    color: "#00000",
    alignSelf: "flex-start",
  },
  senderUser: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: "10px",
    fontWeight: "500",
    marginTop: "0px",
  },
  senderBot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "10px",
    fontWeight: "500",
    marginTop: "0px",
  },
  messageBox: {
    width: "100%",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    backgroundColor: "#b7badd",
  },
  textFieldContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flex: 1,
    marginRight: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },
  sendButton: {
    color: "#383c96",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#383c96",
    },
  },
  icon: {
    color: "383c96",
  },
}));

function Chat() {
  const classes = useStyles();
  const [myMessages, setMyMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    let messageWindow = document.querySelector("#messageWindow");
    if (messageWindow) {
      messageWindow.scrollTo(0, messageWindow.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [myMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    console.log("newMessage: ", newMessage);

    setMyMessages((prev) => {
      return [...prev, { text: newMessage, from: "user" }];
    });

    let response = await axios.post("http://localhost:5001/message", {
      query: newMessage,
    });

    setMyMessages((prev) => {
      return [
        ...prev,
        {
          text: response?.data?.message?.text,
          from: "bot",
        },
      ];
    });

    e.target.reset();
  };

  return (
    <Grid container className={classes.body}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className={classes.messageScreen}>
          <div className={classes.chatTitle}>
            <Avatar style={{ marginRight: "auto" }} />
            <Typography className={classes.chatTitleText}>ChatBot</Typography>
            <IconButton style={{ marginLeft: "auto" }}>
              <SettingsIcon className={classes.icon} />
            </IconButton>
          </div>
          <div id="messageWindow" className={classes.messageWindow}>
            {myMessages.map((eachMessage, key) => {
              if (eachMessage.from === "bot") {
                return (
                  <div key={key} className={classes.botMessage}>
                    <div className={classes.botMessageBaloon}>
                      <span>{eachMessage.text}</span>
                    </div>
                    <div className={classes.senderBot}>{eachMessage.from}</div>
                  </div>
                );
              } else {
                return (
                  <div key={key} className={classes.userMessage}>
                    <div className={classes.userMessageBaloon}>
                      <span>{eachMessage.text}</span>
                    </div>
                    <div className={classes.senderUser}>{eachMessage.from}</div>
                  </div>
                );
              }
            })}
          </div>

          <form onSubmit={sendMessage} className={classes.messageBox}>
            <Box className={classes.textFieldContainer} sx={{}}>
              <TextField
                className={classes.textField}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                id="outlined-basic"
                placeholder="type a new message"
                variant="outlined"
              />
              <Box>
                <IconButton className={classes.sendButton}>
                  <SendIcon />
                </IconButton>
                <IconButton>
                  <InsertEmoticonIcon className={classes.icon} />
                </IconButton>
              </Box>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Chat;
