export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
}

export const news: NewsPost[] = [
  {
    slug: 'company-established',
    title: '北京铭挚建筑工程有限公司正式成立',
    date: '2024-12-31',
    excerpt: '经北京市门头沟区市场监督管理局核准，北京铭挚建筑工程有限公司于2024年12月31日正式注册成立，开启建筑事业新征程。',
    content: `<p>经北京市门头沟区市场监督管理局核准，北京铭挚建筑工程有限公司于2024年12月31日正式注册成立，注册资本800万元人民币。</p>
<p>公司经营范围涵盖建设工程施工、建筑劳务分包、施工专业作业、专业设计服务、工程管理服务等建筑行业核心领域。公司将立足北京，面向全国，以"匠心筑品质、诚信铸未来"为经营理念，致力于成为值得信赖的建筑工程服务提供商。</p>
<p>未来，铭挚建筑将不断提升专业技术能力，严格把控工程质量，为客户创造更大价值，为城市建设贡献力量。</p>`,
    image: '/images/hero/default.jpg',
    category: '公司动态',
  },
  {
    slug: 'business-scope-intro',
    title: '铭挚建筑主营业务介绍',
    date: '2025-01-15',
    excerpt: '全面介绍公司主营业务，涵盖工程施工、设计服务、工程管理、建材销售四大板块，为客户提供一站式建筑解决方案。',
    content: `<p>北京铭挚建筑工程有限公司立足建筑行业，构建了以工程施工为核心、设计服务为先导、工程管理为保障、建材销售为支撑的业务体系。</p>
<h3>工程施工板块</h3>
<p>包括建设工程施工、建筑劳务分包、施工专业作业三大核心业务，可承接各类建筑物的施工建设及专业作业任务。</p>
<h3>设计服务板块</h3>
<p>提供从概念规划到施工图设计的全流程专业设计服务，注重功能性与美观性的统一。</p>
<h3>工程管理板块</h3>
<p>涵盖工程管理服务、物业管理、机械设备租赁等，为项目全生命周期提供专业管理支持。</p>
<h3>建材销售板块</h3>
<p>经营建筑装饰材料、金属制品、消防器材等多种建筑材料，为工程建设提供可靠的材料保障。</p>`,
    image: '/images/hero/default.jpg',
    category: '业务介绍',
  },
  {
    slug: 'safety-first-policy',
    title: '铭挚建筑始终坚持安全第一的质量方针',
    date: '2025-03-01',
    excerpt: '公司建立健全安全生产管理体系，将安全质量管理贯穿于工程建设的每一个环节，确保施工安全和工程质量。',
    content: `<p>安全生产是建筑企业的生命线。北京铭挚建筑工程有限公司自成立以来，始终坚持"安全第一、预防为主、综合治理"的安全生产方针。</p>
<p>公司建立了完善的安全生产管理体系，包括安全培训制度、安全检查制度、安全技术交底制度等，确保每一位员工都具备必要的安全意识和操作技能。</p>
<p>在质量管理方面，公司严格执行国家和行业标准，建立了从材料进场到竣工验收的全过程质量控制体系，确保每一项工程都经得起检验。</p>
<p>未来，铭挚建筑将继续加大安全管理投入，不断提升安全管理水平，为客户提供更加安全、优质的建筑产品和服务。</p>`,
    image: '/images/hero/default.jpg',
    category: '安全管理',
  },
];

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return news.find(n => n.slug === slug);
}

export function getStaticPaths() {
  return news.map(n => ({ params: { slug: n.slug }, props: { post: n } }));
}
