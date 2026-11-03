import { LessonPlan } from '../types/khbd';

export const SAMPLE_LESSONS: LessonPlan[] = [
  {
    id: 'khbd-gdktpl-11-lam-phat',
    header: {
      id: 'khbd-gdktpl-11-lam-phat',
      subject: 'Giáo dục kinh tế và pháp luật',
      grade: 11,
      bookSeries: 'Kết nối tri thức với cuộc sống',
      lessonTitle: 'Bài 3: Lạm phát và các hình thái lạm phát',
      durationPeriods: 2,
      lessonNumber: 'Bài 3',
      createdAt: '2026-10-15T08:00:00.000Z',
      updatedAt: '2026-11-01T14:30:00.000Z',
    },
    schoolInfo: {
      schoolName: 'TRƯỜNG TH, THCS & THPT FPT',
      department: 'TỔ KHOA HỌC XÃ HỘI & KỸ NĂNG',
      teacherName: 'Tổ bộ môn GDCD - GDKTPL',
      schoolYear: '2025 - 2026',
      date: '02/11/2026',
    },
    objectives: {
      knowledge: [
        'Nêu được khái niệm lạm phát và các loại hình lạm phát (vừa phải, phi mã, siêu lạm phát).',
        'Phân tích được các nguyên nhân cơ bản dẫn đến lạm phát (chi phí đẩy, cầu kéo, tiền tệ).',
        'Chỉ ra được hậu quả của lạm phát đối với nền kinh tế và đời sống của người dân.',
        'Xác định được vai trò, trách nhiệm của Nhà nước và công dân trong việc kiểm soát lạm phát.'
      ],
      generalCompetencies: {
        selfReliance: [
          'Chủ động tra cứu số liệu lạm phát của Việt Nam và thế giới qua Tổng cục Thống kê (GSO) và các cổng thông tin tài chính số.',
          'Tự lập kế hoạch chi tiêu cá nhân trong bối cảnh giá cả biến động.'
        ],
        communication: [
          'Biết lắng nghe, phân công công việc nhóm để phân tích tình huống thực tế về sự mất giá của đồng tiền.',
          'Trình bày tự tin, thuyết phục kết quả làm việc nhóm trước tập thể lớp.'
        ],
        problemSolving: [
          'Đánh giá tác động của lạm phát đến người tiêu dùng và doanh nghiệp khởi nghiệp.',
          'Đề xuất giải pháp chi tiêu thông minh và đầu tư kiến thức tài chính cá nhân.'
        ]
      },
      specificCompetencies: [
        'Năng lực tìm hiểu và tham gia các hoạt động kinh tế: Nhận biết hiện tượng biến động giá hàng hóa trên thị trường, hiểu bản chất chỉ số CPI.',
        'Năng lực điều chỉnh hành vi: Có hành vi tiêu dùng hợp lý, không tích trữ đầu cơ đẩy giá, chia sẻ khó khăn với gia đình khi giá cả leo thang.'
      ],
      qualities: {
        patriotism: 'Tin tưởng vào chính sách điều hành kinh tế vĩ mô của Đảng và Nhà nước trong ổn định giá cả thị trường.',
        compassion: 'Đồng cảm, thấu hiểu với người lao động có thu nhập thấp chịu ảnh hưởng nặng nề bởi lạm phát.',
        diligence: 'Chăm chỉ tìm tòi kiến thức kinh tế học cơ bản, nghiên cứu tư liệu học tập từ thầy cô cung cấp.',
        honesty: 'Trung thực trong khảo sát giá cả thị trường thực tế và báo cáo số liệu bài tập.',
        responsibility: 'Có trách nhiệm trong quản lý tài chính bản thân, không lãng phí tài sản của gia đình và nhà trường.'
      },
      integration: [
        'Tích hợp Toán học: Tính toán tỷ lệ lạm phát, bài toán lãi suất thực và chỉ số CPI cơ bản.',
        'Tích hợp Chuyển đổi số FPT: Khuyến khích HS sử dụng ứng dụng ghi chép tài chính số (Money Lover / Excel) để quản lý chi tiêu.',
        'Giáo dục kỹ năng sống: Kỹ năng quản lý tài chính cá nhân, thích ứng với biến động thị trường.'
      ]
    },
    equipment: {
      teacherEquipment: [
        'Giáo án điện tử thiết kế trên Canva/PowerPoint sinh động, sơ đồ tư duy chỉ số lạm phát.',
        'Màn hình tương tác thông minh / Máy chiếu của phòng học FPT.',
        'Video phóng sự ngắn của VTV24 về "Cơn bão giá cả và tác động đến bữa cơm gia đình".',
        'Hệ thống Phiếu học tập số 1 (Tìm hiểu khái niệm), Phiếu số 2 (Phân loại lạm phát), Phiếu số 3 (Xử lý tình huống).'
      ],
      studentEquipment: [
        'Sách giáo khoa GDKTPL 11 (Bộ Kết nối tri thức), vở ghi bài.',
        'Thiết bị học tập số (Laptop/Tablet/Điện thoại) tra cứu thông tin CPI Việt Nam qua cổng www.gso.gov.vn.',
        'Bút dạ, giấy A3 phục vụ báo cáo nhóm.'
      ]
    },
    activities: [
      {
        id: 'act-1-khoi-dong',
        type: 'warmup',
        title: 'Hoạt động 1: Mở đầu - Trò chơi "Ký ức giá cả: 100.000 VNĐ mua được gì?"',
        durationMinutes: 8,
        objective: 'Tạo tâm thế hứng thú học tập, kích hoạt trải nghiệm thực tế của học sinh về hiện tượng tăng giá cả hàng hóa, kết nối vào bài học Lạm phát.',
        content: 'Học sinh tham gia so sánh sức mua của tờ 100.000 VNĐ ở thời điểm 10 năm trước (2016) và hiện tại (2026) thông qua các mặt hàng thiết yếu: bát phở, lít xăng, cốc trà sữa.',
        product: 'Câu trả lời của HS: Nhận ra cùng một số tiền 100.000 VNĐ nhưng số lượng hàng hóa mua được ngày càng giảm đi (2016 mua được 3-4 bát phở, 2026 chỉ mua được 2 bát). Khẳng định được hiện tượng đồng tiền bị giảm sức mua, giá cả chung leo thang.',
        teachingMethod: 'Trò chơi tương tác - Phỏng vấn nhanh trải nghiệm',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV trình chiếu hình ảnh tờ tiền 100.000 VNĐ và đưa ra câu hỏi thách đố: "Hãy nhớ lại hoặc hỏi bố mẹ: 10 năm trước 100k mua được mấy bát phở/mấy lít xăng? Còn hiện nay thì sao?". Giao nhiệm vụ cho các bàn thảo luận nhanh trong 2 phút.',
            studentActivity: 'HS quan sát hình ảnh, lắng nghe nhiệm vụ, trao đổi nhanh với bạn cùng bàn để so sánh mức giá của bát phở, cốc trà sữa qua các mốc thời gian.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV quan sát không khí thảo luận của các bàn, khích lệ HS chia sẻ kỷ niệm thực tế về sự thay đổi giá cả tiêu dùng cá nhân.',
            studentActivity: 'HS liệt kê các mặt hàng quen thuộc, đối chiếu giá quá khứ và hiện tại, tính ra số lượng hàng hóa chênh lệch.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV gọi ngẫu nhiên 2 - 3 HS đứng lên chia sẻ câu trả lời. Chiếu bảng so sánh giá cả tham khảo lên màn hình LED.',
            studentActivity: 'HS đại diện phát biểu: "Dạ thưa cô, năm 2016 với 100k em mua được 4 cốc trà sữa trân châu, còn năm nay 100k chỉ mua được 2 cốc loại vừa". Các bạn khác gật đầu đồng tình và bổ sung thêm ví dụ về giá xăng xe máy.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV nhận xét câu trả lời, dẫn dắt: "Cùng một tờ tiền mệnh giá 100.000 VNĐ, nhưng lượng hàng hóa ta mua được ngày càng ít đi. Hiện tượng mức giá chung tăng liên tục và sức mua của đồng tiền sụt giảm chính là Lạm phát. Vậy lạm phát do đâu mà có, tác hại ra sao? Chúng ta cùng khám phá Bài 3".',
            studentActivity: 'HS lắng nghe lời kết luận của GV, mở vở ghi tiêu đề Bài 3: Lạm phát.'
          }
        ]
      },
      {
        id: 'act-2-kham-pha',
        type: 'discovery',
        title: 'Hoạt động 2: Khám phá - Tìm hiểu Khái niệm, Phân loại và Nguyên nhân của lạm phát',
        durationMinutes: 45,
        objective: 'Học sinh hiểu rõ định nghĩa lạm phát, phân biệt được 3 mức độ lạm phát theo tỷ lệ % và phân tích được 3 nguyên nhân cốt lõi gây ra lạm phát.',
        content: 'Lớp chia làm 4 nhóm thực hiện kỹ thuật "Mảnh ghép" nghiên cứu tư liệu SGK và Phiếu học tập số 1, 2.',
        product: 'Sản phẩm nhóm trên giấy A3: Sơ đồ tư duy hoàn chỉnh gồm:\n1. Khái niệm: Lạm phát là sự tăng mức giá chung một cách liên tục của hàng hóa và dịch vụ theo thời gian và sự mất giá trị của một loại tiền tệ.\n2. Phân loại:\n- Lạm phát vừa phải: dưới 10%/năm, giá cả biến động chậm, kinh tế ổn định.\n- Lạm phát phi mã: từ 10% đến dưới 1.000%/năm, đồng tiền mất giá nhanh, ảnh hưởng lớn đến hợp đồng và đầu tư.\n- Siêu lạm phát: từ 1.000%/năm trở lên, đồng tiền gần như vô giá trị, kinh tế khủng hoảng nghiêm trọng (ví dụ: Zimbabwe, Venezuela).\n3. Nguyên nhân: Cầu kéo (nhu cầu tiêu dùng vượt cung), Chi phí đẩy (giá xăng dầu, nguyên liệu đầu vào tăng), Tiền tệ (Nhà nước in tiền quá mức cung ứng).',
        teachingMethod: 'Kỹ thuật Mảnh ghép kết hợp Sơ đồ tư duy',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV chia lớp thành 4 nhóm chuyên gia (Vòng 1: 7 phút) để giải quyết các mảnh ghép: Nhóm 1 nghiên cứu Khái niệm; Nhóm 2 nghiên cứu 3 loại hình lạm phát; Nhóm 3 phân tích nguyên nhân Cầu kéo & Chi phí đẩy; Nhóm 4 phân tích nguyên nhân Tiền tệ & giải pháp. Sau đó đổi về Nhóm mảnh ghép (Vòng 2: 8 phút) để tổng hợp thành bức tranh toàn diện trên giấy A3.',
            studentActivity: 'HS nắm rõ mã số nhóm của mình, nhận phiếu học tập tương ứng, di chuyển về vị trí nhóm chuyên gia nghiêm túc.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV đi đến từng bàn chuyên gia quan sát, đặt câu hỏi gợi mở: "Tại sao lạm phát vừa phải (dưới 10%) lại được xem như chất bôi trơn cho nền kinh tế?", hỗ trợ nhóm 4 nếu còn băn khoăn về cung tiền tệ.',
            studentActivity: 'HS vòng chuyên gia đọc mục 1, 2 SGK, thảo luận sôi nổi, ghi chép luận điểm chính. Khi chuyển sang vòng mảnh ghép, từng thành viên lần lượt giảng lại phần kiến thức mình phụ trách cho các bạn trong nhóm mới nghe và cùng vẽ sơ đồ tư duy chung.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV mời đại diện Nhóm 2 và Nhóm 3 treo poster sơ đồ tư duy lên bảng, chỉ định Nhóm 1 và Nhóm 4 đặt câu hỏi phản biện chất vấn.',
            studentActivity: 'Đại diện Nhóm 2 thuyết trình lưu loát về bảng phân biệt 3 loại hình lạm phát. Nhóm 1 đặt câu hỏi: "Nếu em gửi tiết kiệm ngân hàng 7%/năm mà lạm phát là 9%/năm thì em được hay mất tiền?". Đại diện nhóm trả lời chính xác: "Lãi suất thực tế là âm 2%, người gửi tiền bị hao hụt sức mua". Cả lớp vỗ tay.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV nhận xét tinh thần hợp tác nhóm xuất sắc của học sinh FPT. Trình chiếu slide chuẩn kiến thức tóm tắt 3 loại hình lạm phát và công thức lãi suất thực tế. Nhấn mạnh bài học về sự điều tiết vĩ mô của Ngân hàng Nhà nước.',
            studentActivity: 'HS đối chiếu sản phẩm nhóm với slide chuẩn của GV, ghi các ý chính và sơ đồ chốt kiến thức vào vở.'
          }
        ]
      },
      {
        id: 'act-3-luyen-tap',
        type: 'practice',
        title: 'Hoạt động 3: Luyện tập - Phân tích tình huống thực tế và Đố vui trắc nghiệm Kahoot',
        durationMinutes: 22,
        objective: 'Củng cố kiến thức đã học, rèn luyện kỹ năng nhận diện loại hình lạm phát và xác định nguyên nhân qua các tình huống kinh tế cụ thể.',
        content: '1. Tham gia 6 câu hỏi trắc nghiệm tương tác nhanh qua nền tảng số.\n2. Phân tích 2 tình huống thực tiễn: Tình huống giá xăng dầu thế giới tăng vọt làm cước vận tải tăng; Tình huống người dân hoảng loạn rút tiền đổi vàng.',
        product: 'Đáp án chi tiết:\n- Trắc nghiệm: 100% HS chọn đúng các mức phân loại (vừa phải <10%, phi mã 10%-<1000%, siêu lạm phát >=1000%).\n- Xử lý tình huống 1: Đây là lạm phát chi phí đẩy vì chi phí nguyên liệu đầu vào (xăng dầu) tăng khiến giá thành sản phẩm tăng.\n- Xử lý tình huống 2: Người dân giữ vàng do đồng tiền mất giá trị; giải pháp Nhà nước là nâng lãi suất điều hành, thắt chặt tiền tệ và công khai minh bạch thông tin vĩ mô để ổn định tâm lý.',
        teachingMethod: 'Tình huống giả định (Case study) & Gamification (Kahoot)',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV cung cấp mã PIN Kahoot lên màn chiếu (6 câu trắc nghiệm nhanh 5 phút). Sau đó phát Phiếu bài tập số 3 gồm 2 tình huống kinh tế thực tế yêu cầu học sinh làm việc cá nhân trong 7 phút.',
            studentActivity: 'HS dùng smartphone hoặc laptop kết nối vào phòng thi Kahoot, hào hứng trả lời các câu hỏi trắc nghiệm, sau đó tập trung làm phiếu tình huống cá nhân.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV theo dõi bảng xếp hạng Kahoot trực tiếp; khi HS làm bài tập tình huống, GV đi quanh lớp nhắc nhở các em căn cứ vào các nguyên nhân đã học để lập luận.',
            studentActivity: 'HS đọc kỹ dữ liệu tình huống: gạch chân từ khóa "giá dầu Brent tăng 40%", "chi phí logistics tăng gấp đôi" để nhận diện đúng dạng lạm phát chi phí đẩy.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV vinh danh top 3 bạn điểm cao nhất phần thi Kahoot. Với phần tình huống, GV gọi 1 học sinh trả lời Tình huống 1 và 1 học sinh phản biện Tình huống 2.',
            studentActivity: 'HS giải thích rõ ràng căn cứ tại sao không phải lạm phát cầu kéo mà là chi phí đẩy. Học sinh khác đồng tình và bổ sung thêm ảnh hưởng gián tiếp đến giá rau củ ngoài chợ.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV biểu dương tư duy phản biện sắc bén của học sinh. Chốt đáp án chuẩn cho 2 tình huống và lưu ý HS cách nhận diện nhanh các tín hiệu giá cả trên thị trường.',
            studentActivity: 'HS tự sửa chữa, bổ sung vào phiếu bài tập cá nhân để lưu vào hồ sơ học tập.'
          }
        ]
      },
      {
        id: 'act-4-van-dung',
        type: 'application',
        title: 'Hoạt động 4: Vận dụng - Dự án mini: "Cẩm nang tiêu dùng thông minh trong thời bão giá"',
        durationMinutes: 15,
        objective: 'Vận dụng kiến thức lạm phát vào đời sống thực tế gia đình và bản thân; xây dựng thói quen chi tiêu thông thái và tinh thần trách nhiệm chia sẻ với gia đình.',
        content: 'Học sinh làm việc theo nhóm 4 em xây dựng bảng kế hoạch phân bổ ngân sách 3.000.000 VNĐ chi tiêu học tập - sinh hoạt trong 1 tháng khi giá cả thị trường tăng 10%.',
        product: 'Bản kế hoạch chi tiêu thực tế gồm:\n1. Bảng phân loại nhu cầu: Cần thiết (Ăn uống, đi lại, học phí, sách vở) chiếm 70% ngân sách; Mong muốn (Ăn vặt, giải trí, mua sắm đồ công nghệ) cắt giảm từ 20% xuống còn 10%; Tiết kiệm dự phòng chiếm 20%.\n2. Biện pháp cụ thể: Đi xe buýt trường hoặc xe đạp điện thay vì đi taxi công nghệ; hạn chế ăn ngoài, mang bình nước cá nhân; tận dụng sách thư viện FPT thay vì mua mới.',
        teachingMethod: 'Dạy học theo dự án nhỏ (Mini-Project) & Bài tập thực hành tài chính',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV giao nhiệm vụ dự án về nhà và hướng dẫn nhanh tại lớp: "Hãy đóng vai một học sinh FPT tự lập, xây dựng cẩm nang 5 mẹo tiết kiệm thông minh giúp gia đình ứng phó lạm phát. Nộp sản phẩm qua Google Classroom dưới dạng infographic hoặc slide ngắn trước buổi học tới".',
            studentActivity: 'HS lắng nghe yêu cầu dự án, ghi chép tiêu chí đánh giá (Rubric) GV trình chiếu trên bảng.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV dành 5 phút cuối để các nhóm hội ý nhanh, phân công trưởng nhóm, người thiết kế Canva, người phỏng vấn bố mẹ về giá cả chi tiêu hàng tháng.',
            studentActivity: 'Các thành viên trong nhóm thống nhất phân công nhiệm vụ, trao đổi ý tưởng mẹo tiết kiệm và hẹn lịch hoàn thiện sản phẩm.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV mời 1 nhóm trình bày nhanh ý tưởng khung cẩm nang (draft idea) để cả lớp góp ý bổ sung.',
            studentActivity: 'Đại diện nhóm nêu ý tưởng: "Nhóm em sẽ thiết kế infographic về phương pháp 6 chiếc lọ tài chính thích ứng với lạm phát". Cả lớp hào hứng ủng hộ.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV đánh giá cao tính thực tiễn của ý tưởng, nhắc nhở hạn chót nộp bài và dặn dò chuẩn bị cho bài học tiếp theo.',
            studentActivity: 'HS ghi nhận hạn nộp, lưu tài liệu và dọn dẹp vệ sinh phòng học trước khi kết thúc tiết học.'
          }
        ]
      }
    ]
  },
  {
    id: 'khbd-gdcd-6-truyen-thong',
    header: {
      id: 'khbd-gdcd-6-truyen-thong',
      subject: 'Giáo dục công dân',
      grade: 6,
      bookSeries: 'Kết nối tri thức với cuộc sống',
      lessonTitle: 'Bài 1: Tự hào về truyền thống gia đình, dòng họ',
      durationPeriods: 2,
      lessonNumber: 'Bài 1',
      createdAt: '2026-10-18T09:00:00.000Z',
      updatedAt: '2026-11-02T11:00:00.000Z',
    },
    schoolInfo: {
      schoolName: 'TRƯỜNG TH, THCS & THPT FPT',
      department: 'TỔ KHOA HỌC XÃ HỘI',
      teacherName: 'Tổ bộ môn GDCD',
      schoolYear: '2025 - 2026',
      date: '03/11/2026',
    },
    objectives: {
      knowledge: [
        'Nêu được một số truyền thống tốt đẹp của gia đình, dòng họ (hiếu học, cần cù lao động, nhân ái, giữ gìn nghề truyền thống).',
        'Giải thích được ý nghĩa to lớn của truyền thống gia đình, dòng họ đối với sự phát triển của mỗi cá nhân.',
        'Xác định được những việc học sinh cần làm và không nên làm để giữ gìn, phát huy truyền thống gia đình, dòng họ.'
      ],
      generalCompetencies: {
        selfReliance: ['Tự tìm hiểu gia phả, lắng nghe ông bà bố mẹ kể về tấm gương sáng của dòng họ mình.'],
        communication: ['Tự hào kể cho bạn bè nghe về nét đẹp văn hóa hoặc nghề truyền thống của quê hương, gia đình.'],
        problemSolving: ['Nhận biết được những hủ tục lạc hậu cần loại bỏ và những giá trị tốt đẹp cần phát huy.']
      },
      specificCompetencies: [
        'Năng lực điều chỉnh hành vi: Biết cư xử đúng mực, kính trọng ông bà cha mẹ, sống xứng đáng với danh dự dòng họ.',
        'Năng lực phát triển bản thân: Luôn nỗ lực học tập, rèn luyện nhân cách theo gương sáng tiền nhân.'
      ],
      qualities: {
        patriotism: 'Tự hào về nguồn cội, biết ơn các thế hệ đi trước.',
        compassion: 'Yêu thương, gắn kết với các thành viên trong gia tộc và cộng đồng.',
        diligence: 'Chăm chỉ, kiên trì trong học tập và công việc hàng ngày.',
        honesty: 'Thật thà, ngay thẳng, giữ gìn uy tín danh gia.',
        responsibility: 'Ý thức trách nhiệm nối tiếp ngọn lửa truyền thống vẻ vang của gia đình.'
      },
      integration: [
        'Tích hợp Lịch sử & Văn học: Các câu ca dao, tục ngữ về đạo lý "Uống nước nhớ nguồn", "Chim có tổ người có tông".',
        'Tích hợp Giáo dục kỹ năng sống: Kỹ năng giao tiếp gia đình, tôn trọng thế hệ người lớn tuổi.'
      ]
    },
    equipment: {
      teacherEquipment: [
        'Slide bài giảng tương tác, video clip phóng sự về "Dòng họ hiếu học đất học Việt Nam".',
        'Cây gia phả mô phỏng, Phiếu học tập số 1 "Hành trình tìm về cội nguồn".'
      ],
      studentEquipment: [
        'Ảnh chụp gia đình, tư liệu hoặc câu chuyện sưu tầm về ông bà, bố mẹ.',
        'SGK Giáo dục công dân 6, bút màu, sổ tay học tập.'
      ]
    },
    activities: [
      {
        id: 'act-gdcd6-1',
        type: 'warmup',
        title: 'Hoạt động 1: Mở đầu - Nghe giai điệu đoán bài hát "Ba ngọn nến lung linh"',
        durationMinutes: 7,
        objective: 'Tạo cảm xúc thiêng liêng về tình cảm gia đình, kích hoạt sự gắn kết tự nhiên dẫn vào bài học.',
        content: 'HS lắng nghe trích đoạn bài hát và chia sẻ một kỷ niệm ấm áp nhất bên mâm cơm gia đình.',
        product: 'HS chia sẻ cảm xúc: Gia đình là tổ ấm thiêng liêng, nơi các thế hệ yêu thương, truyền dạy cho nhau những bài học làm người đầu tiên.',
        teachingMethod: 'Khơi gợi cảm xúc qua âm nhạc',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV bật giai điệu bài hát quen thuộc, yêu cầu HS nhắm mắt cảm nhận trong 1 phút và viết ra giấy note một phẩm chất đáng tự hào nhất về gia đình mình.',
            studentActivity: 'HS lắng nghe âm nhạc, suy ngẫm và viết nhanh lên giấy note (ví dụ: siêng năng, thương người, hiếu học...).'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV quan sát, mỉm cười khích lệ các em học sinh lớp 6 tự tin thể hiện cảm xúc chân thành.',
            studentActivity: 'HS dán các mảnh giấy note lên "Cây Tự Hào" do GV bố trí ở góc lớp.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV đọc to 3 mẩu giấy xúc động nhất của học sinh.',
            studentActivity: 'HS lắng nghe câu chuyện của bạn, cảm nhận sự đa dạng và giàu đẹp của các truyền thống gia đình Việt.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV kết luận: "Mỗi gia đình như một cái cây, truyền thống chính là bộ rễ nuôi dưỡng ta khôn lớn. Hôm nay chúng ta cùng khám phá Bài 1".',
            studentActivity: 'HS mở SGK trang 5, ghi bài.'
          }
        ]
      },
      {
        id: 'act-gdcd6-2',
        type: 'discovery',
        title: 'Hoạt động 2: Khám phá - Tìm hiểu các truyền thống tốt đẹp và ý nghĩa của truyền thống',
        durationMinutes: 45,
        objective: 'Chỉ ra được ít nhất 4 truyền thống tốt đẹp (hiếu học, cần cù, nhân ái, nghề truyền thống) và nêu rõ ý nghĩa đối với sự trưởng thành của mỗi cá nhân.',
        content: 'HS đọc câu chuyện về dòng họ Nguyễn Cảnh và trường hợp gia đình bạn Hà trong SGK, hoàn thành Phiếu học tập số 1.',
        product: 'Bảng tổng hợp phiếu học tập:\n- Các truyền thống tốt đẹp: Cần cù lao động (nghề làm gốm Bát Tràng, làm nón); Hiếu học (đỗ đạt thủ khoa, giáo sư); Tương thân tương ái (giúp đỡ xóm giềng nghèo khó); Yêu nước chống giặc.\n- Ý nghĩa: Giúp con người tự tin, có thêm động lực phấn đấu, có chỗ dựa tinh thần vững chắc, được cộng đồng kính trọng.',
        teachingMethod: 'Đọc tích cực - Kỹ thuật Khăn trải bàn',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV chia lớp thành các bàn 4 em, phát tấm giấy A2 chia làm 4 góc và 1 ô trung tâm (kỹ thuật Khăn trải bàn). Nêu 2 câu hỏi: 1) Gia đình trong câu chuyện có truyền thống gì? 2) Truyền thống đó giúp ích gì cho các thành viên?',
            studentActivity: 'HS ngồi đúng vị trí góc của mình, nhận giấy và bút dạ, đọc kỹ câu chuyện SGK.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV đi quanh các bàn, hướng dẫn HS viết ý kiến cá nhân vào góc riêng trong 3 phút, sau đó thảo luận chắt lọc ý chung ghi vào ô giữa trong 5 phút.',
            studentActivity: 'Từng em viết câu trả lời độc lập, sau đó chủ động trao đổi, thống nhất các từ khóa cốt lõi điền vào ô trung tâm.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV chỉ định 2 bàn trình bày, các bàn khác giơ biển nhận xét (Đồng ý/Cần bổ sung).',
            studentActivity: 'HS nhóm 3 tự tin thuyết trình: nêu rõ truyền thống làm thuốc nam cứu người và tinh thần nhân ái được lưu truyền 4 thế hệ.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV chuẩn hóa kiến thức, khen ngợi các bạn đã phân tích sâu sắc ý nghĩa của truyền thống là ngọn đuốc soi đường cho thế hệ trẻ.',
            studentActivity: 'HS ghi chép các ý cốt lõi vào vở.'
          }
        ]
      },
      {
        id: 'act-gdcd6-3',
        type: 'practice',
        title: 'Hoạt động 3: Luyện tập - Phân biệt hành vi đúng sai & Xử lý tình huống bạn bè',
        durationMinutes: 20,
        objective: 'Học sinh biết đồng tình với những việc làm giữ gìn truyền thống và phê phán thái độ tự ti, mặc cảm hoặc ỷ lại vào gia thế.',
        content: 'Xử lý 2 tình huống: Tình huống 1 (Bạn An xấu hổ vì bố mẹ làm nghề thu gom phế liệu); Tình huống 2 (Bạn Bình ỷ lại vào dòng họ quyền thế không chịu học hành).',
        product: 'Phương án xử lý chuẩn:\n- Tình huống 1: Khuyên An hiểu rằng nghề lao động chân chính nào cũng cao quý; bố mẹ tần tảo nuôi con bằng mồ hôi nước mắt là tấm gương cần cù đáng tự hào, không có gì phải xấu hổ.\n- Tình huống 2: Phê phán thái độ kiêu ngạo, ỷ lại của Bình; danh dự dòng họ do tổ tiên xây đắp, nếu bản thân lười biếng sẽ làm hoen ố thanh danh gia đình.',
        teachingMethod: 'Đóng vai xử lý tình huống',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV giao tình huống 1 cho nửa lớp bên trái và tình huống 2 cho nửa lớp bên phải. Mời 2 đôi bạn đóng vai tái hiện cuộc trò chuyện khuyên nhủ.',
            studentActivity: 'HS nhận tình huống, bàn bạc cách xưng hô và lý lẽ khuyên bạn chân tình, sâu sắc.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV hướng dẫn HS chú ý giọng điệu thuyết phục, tránh phán xét nặng nề mà nên dùng tình cảm và lý lẽ đạo đức.',
            studentActivity: 'Các cặp đôi tập dượt lời thoại: "An ơi, tớ thấy bác làm việc rất vất vả và lương thiện, cậu nên thương bố mẹ nhiều hơn...".'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV mời 2 nhóm lên phía trước bục giảng thể hiện phần đóng vai.',
            studentActivity: 'HS nhập vai tự nhiên, diễn tả cảm xúc chạm tới trái tim người xem, cả lớp vỗ tay tán thưởng nhiệt liệt.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV chốt lại thông điệp: "Không có nghề nghiệp nào thấp hèn nếu làm bằng bàn tay chân chính. Tự hào về gia đình không phải khoe khoang gia thế mà là nỗ lực sống tử tế mỗi ngày".',
            studentActivity: 'HS thấm thía bài học, ghi nhớ quy tắc ứng xử văn minh.'
          }
        ]
      },
      {
        id: 'act-gdcd6-4',
        type: 'application',
        title: 'Hoạt động 4: Vận dụng - Làm thiệp hoặc sổ lưu niệm "Lời tri ân gia đình"',
        durationMinutes: 18,
        objective: 'Học sinh thực hiện một hành động cụ thể để bày tỏ lòng biết ơn đối với ông bà, cha mẹ.',
        content: 'Thiết kế một tấm thiệp hoặc bức thư ngắn ghi lại lời hứa rèn luyện của bản thân và gửi đến người thân.',
        product: 'Những tấm thiệp thủ công xinh xắn với lời nhắn gửi chân thành: "Con cảm ơn ông bà đã dạy con bài học về sự trung thực. Năm học này con hứa sẽ cố gắng đạt danh hiệu Học sinh Giỏi FPT để làm rạng danh dòng họ!".',
        teachingMethod: 'Học tập trải nghiệm sáng tạo (Hands-on activity)',
        steps: [
          {
            stepNumber: 1,
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherActivity: 'GV phát giấy bìa màu và dán sticker trang trí, hướng dẫn HS tự tay viết thư tri ân.',
            studentActivity: 'HS nhận nguyên vật liệu, nắn nót viết từng dòng chữ gửi tặng bố mẹ.'
          },
          {
            stepNumber: 2,
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherActivity: 'GV bật nhạc không lời êm dịu, bao quát lớp, hỗ trợ những bạn cần gợi ý từ ngữ biểu đạt.',
            studentActivity: 'HS tập trung hoàn thiện tác phẩm với tất cả sự nâng niu, trân trọng.'
          },
          {
            stepNumber: 3,
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherActivity: 'GV mời 2 bạn tình nguyện chia sẻ nội dung thiệp của mình.',
            studentActivity: 'HS đọc to bức thư với giọng xúc động, lan tỏa năng lượng tích cực khắp phòng học.'
          },
          {
            stepNumber: 4,
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherActivity: 'GV dặn dò các em khi về nhà hãy trân trọng trao tận tay tấm thiệp cho cha mẹ. Đánh giá tổng kết giờ học xuất sắc.',
            studentActivity: 'HS cất thiệp cẩn thận vào cặp sách, chào thầy cô.'
          }
        ]
      }
    ]
  }
];
