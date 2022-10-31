package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(length = 100)
    private String memberEmail;
    @Column(length = 20)
    private String memberPwd;
    @Column(length = 20)
    private String memberNickname;
    @Column(columnDefinition = "TINYINT", length=1)
    private int memberGender;
    private int memberCoin;
    private int memberTicket;
    @Column(length = 500)
    private String memberTop;
    @Column(length = 500)
    private String memberBottom;
    private Long memberPet;
    private int memberChapter;
    private int memberCheckpoint;
}