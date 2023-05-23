const maparray = [
  { "id": 1, "name": "칠암캠운동장", Lat : 35.181368, Lng: 128.092885, img : "https://www.gnnews.co.kr/news/photo/202106/476492_264312_475.jpg"},
  { "id": 2, "name": "칠암캠체육관", Lat : 35.180550, Lng: 128.092695, img : "https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTVfMjU2/MDAxNjEwNjcwMTEyMDM0.hxM1ihaUmNTbmEzbyB7h8-lXYNayyUcHjVdcHePDr94g.2TzU8z1HjWs-eFNw5Qf-Z2ZBfizGViJjTE0rpLYVlEwg.JPEG.bindustrycop/%EA%B2%BD%EB%82%A8_%EC%A7%84%EC%A3%BC_%EA%B2%BD%EB%82%A8%EA%B3%BC%ED%95%99%EA%B8%B0%EC%88%A0%EB%8C%80_%EC%95%88%EC%A0%84%ED%8C%A8%EB%94%A9_(9).jpg?type=w800"  },
  { "id": 3, "name": "칠암캠농구장", Lat : 35.181707, Lng: 128.092445, img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOccwAOr8ve899F5aV78zie05v1kFxf1tmw&usqp=CAU"  },
  { "id": 4, "name": "칠암캠풋살장", Lat : 35.181853, Lng: 128.092303, img : "https://www.sisul.or.kr/open_content/skydome/images/photo_futsal01.jpg"  },
  { "id": 5, "name": "칠암캠테니스장", Lat : 35.181990, Lng: 128.093008, img : "https://cdn.crowdpic.net/detail-thumb/thumb_d_DA443B973B3CF36BDDE373E42ACC36E3.jpg"  },
  { "id": 6, "name": "칠암캠족구장", Lat : 35.181878, Lng: 128.092629, img : "https://image.auction.co.kr/itemimage/fd/ad/31/fdad310a6.jpg" },

  { "id": 7, "name": "가좌캠풋살장", Lat : 35.154370, Lng: 128.103407, img : "https://www.gnunews.kr/news/photo/201911/8757_51_0000.jpg" },
  { "id": 8, "name": "가좌캠교직원테니스장", Lat : 35.156537, Lng: 128.102683, img : "https://www.gnu.ac.kr/upload//campus/img_44897945-9bf7-40b2-97c8-4238642e9d181675164473050.jpg"  },
  { "id": 9, "name": "가좌캠테니스장", Lat : 35.154181, Lng: 128.102844, img : "https://mblogthumb-phinf.pstatic.net/MjAyMjEyMDdfMTY1/MDAxNjcwMzc5ODIwMDY3.GqQchV3csJj3p57F0yE0B9roG_p4iMCJYDsEwCl7nQUg.T85b5phBAPTnU4SX-1G-kOcxemN_jYH6pe9lrdDPkxYg.PNG.capminjuni/image.png?type=w800" },
  { "id": 10, "name": "가좌캠족구장", Lat : 35.154658, Lng: 128.102755, img : "https://image.auction.co.kr/itemimage/fd/ad/31/fdad310a6.jpg"  },
  { "id": 11, "name": "가좌캠농구장", Lat : 35.154627, Lng: 128.102903, img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOccwAOr8ve899F5aV78zie05v1kFxf1tmw&usqp=CAU"  },
  { "id": 12,"name": "가좌캠대운동장", Lat : 35.154850, Lng: 128.104504, img : "https://www.gnu.ac.kr/upload//campus/img_98287e4a-5e67-4985-bde8-7ffde34728f01675164411173.jpg" },
  { "id": 13, "name": "가좌캠운동장", Lat : 35.151364, Lng: 128.100821, img : "https://www.gnu.ac.kr/upload//campus/img_a8e3b39a-e912-41e3-85ca-7a5d2346ff791667882330403.jpg" },
  { "id": 14, "name": "가좌캠체육관", Lat : 35.155414, Lng: 128.103060, img : "https://www.gnu.ac.kr/upload//campus/img_fd9559e2-5262-459f-a2e7-4edade9eaa0e1667881475043.jpg" },

  { "id": 15, "name": "통염캠운동장1", Lat : 34.838744, Lng: 128.399730, img : "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjhfMTgy/MDAxNTQwNzIxNTQzNTYx.M1tQpUPK5dyoBIC9YPMAJB5wrYiAhqMDSj0T2UNouesg.2PKE05z16r8EdR1zxi5UM0E9PBkwXNXao7d8yrNGFXMg.JPEG.kmu2333/20180213_115841.jpg?type=w800"  },
  { "id": 16,"name": "통염캠운동장2", Lat : 34.836729, Lng: 128.400170, img : "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjhfMjcg/MDAxNTQwNzIxNTQ0MzIy.ZYxmLmI0w64kSA0Gv6W2TU6BJAtifq2fYCChaZbLHLcg.9xkpIYwAlPYAw0uysZGWFOjovtJ8jN5vMvKGKoowe9gg.JPEG.kmu2333/20180213_115910.jpg?type=w800" },
  { "id": 17, "name": "통염캠체육관", Lat : 34.838022, Lng: 128.399127, img : "https://www.gnu.ac.kr/upload//campus/img_1efdf209-be0d-4ec6-8285-d732eaae2ad51673411867261.jpg"  },
  { "id": 18, "name": "통염캠테니스장", Lat : 34.838553, Lng: 128.398888, img : "https://cdn.crowdpic.net/detail-thumb/thumb_d_DA443B973B3CF36BDDE373E42ACC36E3.jpg"  }
]