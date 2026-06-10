export interface Category {
  slug: string;
  name: string;
}

export interface Service {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  detail: string;
  icon: string;
  features: string[];
}

export const categories: Category[] = [
  { slug: 'construction', name: '工程施工' },
  { slug: 'design', name: '设计服务' },
  { slug: 'management', name: '工程管理' },
  { slug: 'sales', name: '建材销售' },
];

export const services: Service[] = [
  {
    slug: 'jianzhushigong',
    name: '建设工程施工',
    category: '工程施工',
    categorySlug: 'construction',
    description: '承接各类建筑建设工程施工项目，涵盖住宅、商业、工业建筑等全类型。',
    detail: '北京铭挚建筑工程有限公司具备建设工程施工资质，可承接各类建筑物的施工建设。公司秉承"安全第一、质量至上"的理念，严格按照国家标准和行业规范进行施工管理，确保每一个项目都达到优质标准。我们的施工团队经验丰富，能够高效完成从基础施工到主体结构、装饰装修的全流程施工任务。',
    icon: 'construction',
    features: ['住宅建筑施工', '商业建筑施工', '工业建筑施工', '市政工程'],
  },
  {
    slug: 'laowufenbao',
    name: '建筑劳务分包',
    category: '工程施工',
    categorySlug: 'construction',
    description: '提供专业的建筑劳务分包服务，拥有经验丰富的施工队伍，保障项目顺利推进。',
    detail: '公司提供建筑劳务分包服务，涵盖木工、钢筋工、混凝土工、砌筑工、抹灰工等多个工种。我们注重劳务人员的安全培训和技能提升，确保施工质量和安全生产。项目覆盖北京及周边地区，可快速调配人员满足不同规模的施工需求。',
    icon: 'workers',
    features: ['多工种劳务分包', '安全培训体系', '灵活人员调配', '质量过程管控'],
  },
  {
    slug: 'shigongzhuanye',
    name: '施工专业作业',
    category: '工程施工',
    categorySlug: 'construction',
    description: '专注于建筑施工中的专业作业环节，提供精细化、标准化的施工作业服务。',
    detail: '公司拥有施工专业作业资质，可承接建筑模板、脚手架、防水、防腐、保温等专业施工作业。采用先进的施工工艺和设备，严格遵循施工规范，确保每一道工序的质量达标，为客户创造安全可靠的建筑产品。',
    icon: 'tool',
    features: ['模板工程', '脚手架工程', '防水工程', '保温工程'],
  },
  {
    slug: 'zhuanyesheji',
    name: '专业设计服务',
    category: '设计服务',
    categorySlug: 'design',
    description: '提供从概念规划到施工图设计的全流程专业设计服务。',
    detail: '公司的设计团队具备丰富的建筑设计经验，能够为客户提供从方案设计、初步设计到施工图设计的全过程设计服务。注重功能性与美观性的统一，充分考虑节能环保要求，为客户打造高品质的建筑设计方案。',
    icon: 'design',
    features: ['方案设计', '施工图设计', '装修设计', '景观规划'],
  },
  {
    slug: 'gongchengguanli',
    name: '工程管理服务',
    category: '工程管理',
    categorySlug: 'management',
    description: '提供项目全生命周期的工程管理服务，确保项目按时、按质、按预算完成。',
    detail: '公司提供专业的工程管理服务，包括项目策划、进度管理、质量控制、成本管控、安全管理等全流程服务。运用科学的管理方法和信息化手段，帮助客户有效控制项目风险，提高建设效率，降低工程成本。',
    icon: 'clipboard',
    features: ['项目策划', '进度管理', '质量控制', '成本管控'],
  },
  {
    slug: 'wuyeguanli',
    name: '物业管理',
    category: '工程管理',
    categorySlug: 'management',
    description: '提供专业的物业管理服务，保障物业的保值增值与良好运营。',
    detail: '公司提供综合物业管理服务，涵盖物业的日常维护、设施设备管理、环境卫生、安保巡逻、绿化养护等方面。以专业化的管理体系和贴心的服务态度，为业主和租户创造舒适、安全的工作和生活环境。',
    icon: 'building',
    features: ['设施维护', '环境卫生', '安保管理', '绿化养护'],
  },
  {
    slug: 'zulin',
    name: '机械设备租赁',
    category: '工程管理',
    categorySlug: 'management',
    description: '提供建筑施工所需各类机械设备的租赁服务，满足不同工程需求。',
    detail: '公司拥有多种建筑施工机械设备的租赁资源，包括塔吊、挖掘机、混凝土搅拌机、脚手架等。设备定期维护保养，确保施工安全和效率。提供灵活的租赁方案，帮助客户降低设备采购成本。',
    icon: 'crane',
    features: ['起重设备', '土方设备', '混凝土设备', '脚手架租赁'],
  },
  {
    slug: 'jczhuangshicailiao',
    name: '建筑装饰材料销售',
    category: '建材销售',
    categorySlug: 'sales',
    description: '供应各类优质建筑装饰材料，为工程建设提供可靠的材料保障。',
    detail: '公司经营各类建筑装饰材料的销售业务，产品涵盖瓷砖、涂料、门窗、五金配件等。与多家知名建材厂商建立了长期合作关系，确保材料品质可靠、价格合理。提供材料选型建议和配送服务，为客户节省采购时间和成本。',
    icon: 'box',
    features: ['瓷砖石材', '涂料油漆', '门窗五金', '配送服务'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter(s => s.categorySlug === categorySlug);
}

export function getStaticPaths() {
  return services.map(s => ({ params: { slug: s.slug }, props: { service: s } }));
}
