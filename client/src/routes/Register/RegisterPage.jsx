import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fetchData } from '../../utils/apis/api';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (data.memberPwd !== data.memberPwdChk) {
      setError('memberPwdChk', { message: '비밀번호가 일치하지 않습니다.' });
    } else {
      fetchData.post('/api/v1/member', data).then((res) => {
        console.log(res.data);
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <label htmlFor="memberEmail">이메일</label>
          <div>
            <input
              id="memberEmail"
              type="email"
              {...register('memberEmail', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            <small role="alert">{errors?.memberEmail?.message}</small>
          </div>
        </InputBox>
        <InputBox>
          <label htmlFor="memberPwd">비밀번호</label>
          <div>
            <input
              id="memberPwd"
              type="password"
              {...register('memberPwd', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 6,
                  message: '6글자 이상 입력해주세요.',
                },
              })}
            />
            <small role="alert">{errors?.memberPwd?.message}</small>
          </div>
        </InputBox>
        <InputBox>
          <label htmlFor="memberPwdChk">비밀번호 확인</label>
          <div>
            <input
              id="memberPwdChk"
              type="password"
              {...register('memberPwdChk', {
                required: '비밀번호를 다시 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '6글자 이상 입력해주세요.',
                },
              })}
            />
            <small role="alert">{errors?.memberPwdChk?.message}</small>
          </div>
        </InputBox>
        <InputBox>
          <label htmlFor="memberNickname">닉네임</label>
          <div>
            <input
              id="memberNickname"
              type="text"
              {...register('memberNickname', {
                required: '닉네임은 필수 입력입니다.',
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력해주세요.',
                },
              })}
            />
            <small role="alert">{errors?.memberNickname?.message}</small>
          </div>
        </InputBox>
        <input type="submit" />
      </form>
    </div>
  );
};

const InputBox = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  label {
    font-size: 22px;
    text-align: center;
    width: 100%;
  }
  input {
    border: none;
    background-color: #d9d9d9;
    height: 40px;
    border-radius: 20px;
    width: 200px;
    font-size: 18px;
    padding: 5px 10px;
  }
`;

export default RegisterPage;
