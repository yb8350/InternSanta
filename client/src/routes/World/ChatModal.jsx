import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { modalState, userInfoState } from '../../Atom';
import {
  NormalDialog,
  NpcFeatButton,
  NpcImages,
  NpcNames,
} from '../../utils/constants/constants';
import { fetchData } from '../../utils/apis/api';

const ChatModal = () => {
  const [dialogCnt, setDialogCnt] = useState(0);
  const [scripts, setScripts] = useState([]);
  const [lengthDialog, setLengthDialog] = useState(0);
  const [modal, setModal] = useRecoilState(modalState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { memberChapter, memberCheckpoint, memberCoin, memberNickname } =
    userInfo;

  const getScript = async () => {
    const res = await fetchData.get('/api/v1/quest/script');
    setScripts(res.data.questScriptList);
  };

  useEffect(() => {
    getScript();
  }, []);

  useEffect(() => {
    if (modal) {
      console.log(scripts);
      setLengthDialog(NormalDialog[modal].length - 1);
    }
  }, [modal]);

  return (
    <>
      {modal ? (
        <Modal>
          <NpcImage>
            <img src={NpcImages[modal]} alt="" />
          </NpcImage>
          <ChatBox>
            <ChatBoxIcon>
              <BsThreeDots color="white" size={30} />
            </ChatBoxIcon>
            <p className="name">{NpcNames[modal]}</p>
            <p className="dialog">{NormalDialog[modal][dialogCnt]}</p>
            <Buttons>
              {NpcFeatButton[modal] ? (
                <FeatBtn>{NpcFeatButton[modal]}</FeatBtn>
              ) : null}
              {lengthDialog === dialogCnt ? (
                <CloseBtn
                  onClick={() => {
                    setDialogCnt(0);
                    setModal(null);
                  }}>
                  닫기
                </CloseBtn>
              ) : (
                <BsFillCaretDownFill
                  className="next"
                  color="#DE6363"
                  size={30}
                  onClick={() => {
                    setDialogCnt(dialogCnt + 1);
                  }}
                />
              )}
            </Buttons>
          </ChatBox>
        </Modal>
      ) : null}
    </>
  );
};

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404);
  z-index: 4;
`;

const ChatBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 60%;
  margin: 40px;
  padding: 20px;
  max-width: 900px;
  height: 30%;
  background-color: #f3f3f3;
  z-index: 5;

  .name {
    width: 100%;
    height: 20%;
    font-size: 30px;
  }

  .dialog {
    width: 90%;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #0d005c;
  }

  .next {
    cursor: pointer;
  }
`;

const NpcImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  padding: 40px;
  img {
    height: 450px;
    object-fit: cover;
  }
`;

const Buttons = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  gap: 10px;
`;

const CloseBtn = styled.div`
  height: 100%;
  border-radius: 30px;
  background-color: #60c783;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 26px;
  cursor: pointer;
  padding: 0 20px;
`;

const FeatBtn = styled.div`
  height: 100%;
  border-radius: 30px;
  background: ${(props) => props.theme.colors.gradientOrange};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 26px;
  cursor: pointer;
  padding: 0 20px;
`;

const ChatBoxIcon = styled.div`
  position: absolute;
  top: -24px;
  right: -12px;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #de6363;
  border-radius: 10px;
  transform: rotate(30deg);
`;

export default ChatModal;
