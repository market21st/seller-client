import React, { useEffect, useState } from "react";
import PostModal from "../../components/common/PostModal";
import AlertModal from "../../components/common/AlertModal";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { myInfo, editMyInfo } from "../../api/myInfo";
import {
  TemplateBox,
  TemplateRow,
  TemplateTitleWrap,
  TemplateWrap,
} from "../order";

const MyPage = () => {
  // 이메일 형식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const [bizFile, setBizFile] = useState("");
  const [logoFile, setLogoFile] = useState("");

  // Modal
  const [alertModal, setAlertModal] = useState(false);
  const [text, setText] = useState("");
  const aleatHandleClose = () => {
    setAlertModal(false);
    if (text.includes("저장 완료")) {
      window.location.reload();
    }
  };

  const [userInfo, setUserInfo] = useState({});
  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  // 내정보 조회
  const getInfo = async () => {
    const { data, statusCode } = await myInfo();
    if (statusCode == 200) {
      setUserInfo(data);
      setEnroll_company({
        address1: data.corpAddr1,
        address2: data.corpPost,
      });
    }
  };

  const onSubmit = async () => {
    const {
      password,
      corpName,
      bankName,
      bankAccount,
      corpCeo,
      corpContact,
      phone,
      corpEmail,
      corpAddr2,
      corpDesc,
      bizType,
      taxType,
      bizNum,
      salesNum,
    } = userInfo;
    const list = {
      password: password,
      corpName: corpName,
      bankName: bankName,
      bankAccount: bankAccount,
      corpCeo: corpCeo,
      corpContact: corpContact,
      phone: phone,
      corpEmail: corpEmail,
      corpAddr1: enroll_company.address1,
      corpAddr2: corpAddr2,
      corpPost: enroll_company.address2,
      corpDesc: corpDesc,
      bizType: bizType,
      taxType: taxType,
      bizNum: bizNum,
      salesNum: salesNum,
    };

    if (!list.password || !userInfo.passwordCheck) {
      setAlertModal(true);
      setText("비밀번호를 입력해주세요.");
      return;
    }
    if (list.password.length < 8) {
      setAlertModal(true);
      setText("비밀번호는 최소 8글자 이상 입력해주세요.");
      return;
    }
    if (list.password != userInfo.passwordCheck) {
      setAlertModal(true);
      setText("비밀번호가 일치하지 않습니다.");
      return;
    }

    for (let key in list) {
      if (!list[key]) {
        setAlertModal(true);
        setText(`정보를 수정하시려면 필수값을 모두 입력해주세요.`);
        return;
      }
    }

    if (!emailRegEx.test(list.corpEmail)) {
      setAlertModal(true);
      setText("이메일 형식에 맞지 않습니다.");
      return;
    }
    if (list.phone.slice(0, 3) !== "010" || list.phone.length != 11) {
      setAlertModal(true);
      setText("휴대전화 형식에 맞지 않습니다.");
      return;
    }
    if (list.phone.slice(0, 3) !== "010" || list.phone.length != 11) {
      setAlertModal(true);
      setText("휴대전화 형식에 맞지 않습니다.");
      return;
    }

    const formData = new FormData();
    for (let key in list) {
      formData.append(key, list[key]);
    }
    formData.append("bizFile", bizFile);
    formData.append("corpImage", logoFile);

    const { data, statusCode } = await editMyInfo(formData);
    if (statusCode == 200) {
      if (data.corpLogo) {
        localStorage.setItem("corpLogo", data.corpLogo);
      }
      localStorage.setItem("corpName", data.corpName);
      setAlertModal(true);
      setText(`저장 완료`);
    } else {
      setAlertModal(true);
      setText("에러");
    }
  };

  // 주소 검색
  const [popup, setPopup] = useState(false);
  const handleComplete = (data) => {
    setPopup(!popup);

    if (popup === true) {
      setUserInfo({
        ...userInfo,
        corpAddr1: enroll_company.address1,
        corpPost: enroll_company.address2,
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <AlertModal open={alertModal} onClose={aleatHandleClose} text={text} />
      <PostModal
        open={popup}
        onClose={handleComplete}
        company={enroll_company}
        setcompany={setEnroll_company}
      />
      <TemplateWrap>
        <TemplateTitleWrap>
          <h2>내 스토어 정보 관리</h2>
          <h3>
            <b>내 스토어 정보 관리</b> 목적 및 상세내용입니다
          </h3>
        </TemplateTitleWrap>
        <TemplateBox>
          <h4>계정 정보</h4>
          <TemplateRow>
            <p>아이디</p>
            <span>{userInfo.userId}</span>
          </TemplateRow>
          <TemplateRow>
            <p>비밀번호</p>
            <TextField
              type="password"
              name="password"
              onChange={onChange}
              sx={{ width: "300px" }}
            />
            <TextField
              type="password"
              name="passwordCheck"
              onChange={onChange}
              placeholder="비밀번호 확인"
              sx={{ width: "300px" }}
            />
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>담당자 정보</h4>
          <TemplateRow>
            <p>담당자 이름</p>
            <TextField
              name="corpCeo"
              value={userInfo.corpCeo || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
          <TemplateRow>
            <p>담당자 이메일</p>
            <TextField
              name="corpEmail"
              value={userInfo.corpEmail || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
          <TemplateRow>
            <p>담당자 휴대폰 번호</p>
            <TextField
              name="phone"
              value={userInfo.phone || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>회사 정보</h4>
          <TemplateRow>
            <p>상호명</p>
            <TextField
              name="corpName"
              value={userInfo.corpName || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
          <TemplateRow>
            <p>회사 주소 (우편번호)</p>
            <Grid container flexDirection={"column"} gap={2}>
              <Grid container gap={2}>
                <TextField
                  name="corpPost"
                  value={enroll_company.address2 || ""}
                  onChange={onChange}
                  placeholder="우편번호"
                  disabled
                  sx={{ width: "200px" }}
                />
                <TextField
                  name="corpAddr1"
                  value={enroll_company.address1 || ""}
                  onChange={onChange}
                  disabled
                  sx={{ width: "400px" }}
                />
                <Button variant="contained" onClick={handleComplete}>
                  검색
                </Button>
              </Grid>
              <TextField
                name="corpAddr2"
                value={userInfo.corpAddr2 || ""}
                onChange={onChange}
                placeholder="상세 주소"
                sx={{ width: "400px" }}
              />
            </Grid>
          </TemplateRow>
          <TemplateRow>
            <p>회사 대표번호</p>
            <TextField
              name="corpContact"
              value={userInfo.corpContact || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
          <TemplateRow>
            <p>사업자 분류</p>
            <FormControl sx={{ width: "300px" }}>
              <Select
                name="bizType"
                value={userInfo.bizType || ""}
                onChange={onChange}
              >
                <MenuItem value="개인사업자">개인사업자</MenuItem>
                <MenuItem value="법인사업자">법인사업자</MenuItem>
              </Select>
            </FormControl>
          </TemplateRow>
          <TemplateRow>
            <p>과세유형</p>
            <FormControl sx={{ width: "300px" }}>
              <Select
                name="taxType"
                value={userInfo.taxType || ""}
                onChange={onChange}
              >
                <MenuItem value="단위과세">단위과세</MenuItem>
                <MenuItem value="간이과세">간이과세</MenuItem>
              </Select>
            </FormControl>
          </TemplateRow>
          <TemplateRow>
            <p>사업자등록증</p>
            <Grid container flexDirection={"column"} gap={2}>
              <a href={userInfo.bizFile} target="_blank">
                {userInfo.bizFile}
              </a>
              <Grid container gap={2}>
                <input
                  id="bizFile"
                  type="file"
                  name="bizFile"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files[0]) setBizFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                <TextField
                  value={bizFile.name || ""}
                  disabled
                  sx={{ width: "300px" }}
                />
                <Button variant="contained">
                  <label htmlFor="bizFile">파일 첨부</label>
                </Button>
              </Grid>
            </Grid>
          </TemplateRow>
          <TemplateRow>
            <p>사업자번호</p>
            <TextField
              name="bizNum"
              value={userInfo.bizNum || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
          <TemplateRow>
            <p>통신판매업 신고번호</p>
            <TextField
              name="salesNum"
              value={userInfo.salesNum || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>정산 정보</h4>
          <TemplateRow>
            <p>정산 계좌번호</p>
            <TextField
              name="bankName"
              value={userInfo.bankName || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
            <TextField
              name="bankAccount"
              value={userInfo.bankAccount || ""}
              onChange={onChange}
              sx={{ width: "300px" }}
            />
          </TemplateRow>
        </TemplateBox>
        <TemplateBox>
          <h4>파트너스토어 정보</h4>
          <TemplateRow>
            <p>대표 이미지 (브랜드 로고)</p>
            <Grid container flexDirection={"column"} gap={2}>
              <a href={userInfo.corpImage} target="_blank">
                {userInfo.corpImage}
              </a>
              <Grid container gap={2}>
                <input
                  id="logoFile"
                  type="file"
                  name="corpImage"
                  onChange={(e) => {
                    setLogoFile(e.target.files[0]);
                  }}
                  accept="jpeg, .jpg, .png"
                  style={{ display: "none" }}
                />
                <TextField
                  value={logoFile.name || ""}
                  disabled
                  sx={{ width: "300px" }}
                />
                <Button variant="contained">
                  <label htmlFor="logoFile">파일 첨부</label>
                </Button>
              </Grid>
            </Grid>
          </TemplateRow>
          <TemplateRow>
            <p>파트너 소개글</p>
            <TextField
              name="corpDesc"
              value={userInfo.corpDesc || ""}
              onChange={onChange}
              multiline
              rows={10}
              sx={{ width: "600px" }}
            />
          </TemplateRow>
        </TemplateBox>
        <div>
          <Button onClick={onSubmit} variant="contained" size="large">
            저장
          </Button>
        </div>
      </TemplateWrap>
    </>
  );
};
export default MyPage;
