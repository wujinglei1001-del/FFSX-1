import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Stack, Tab, Typography } from '@mui/material';
import Image from 'components/base/Image';
import SectionHeader from '../common/SectionHeader';

const missionContent = {
  1: {
    title: '连接全球贸易中的每一个角色',
    paragraphs: [
      'FFAX 致力于成为全球贸易网络中的数字桥梁，让跨境卖家、工厂、采购商、物流、海外仓及企业服务机构在可信环境中建立连接。',
      '平台让真实需求找到合适的能力提供者，并将一次连接延伸为可以持续协作和履约的业务关系。',
    ],
    secondaryTitle: '让贸易协作形成完整闭环',
    secondaryParagraph:
      '从发现需求、建立连接到履约追踪与信用沉淀，FFAX 让分散的贸易角色在统一网络中高效协同。',
  },
  2: {
    title: '用软件把需求转化为可执行流程',
    paragraphs: [
      '企业发布结构化需求后，系统依据角色、地区、商品、服务能力与履约条件匹配合适的参与者。',
      '合作双方可以在线交换资料、确认任务、跟踪进度并沉淀业务数据，减少重复沟通和人工流转。',
    ],
    secondaryTitle: 'AI 提升每一次连接的效率',
    secondaryParagraph:
      'AI 参与需求理解、单据解析、智能匹配、合规判断和风险预警，但业务连接始终由企业掌控。',
  },
  3: {
    title: '支撑真实跨境业务的系统能力',
    paragraphs: [
      'FFAX 连接电商、物流、仓储与企业系统，为身份准入、订单协同、合规、履约和全程追踪提供统一能力。',
      '企业级权限、团队任务、客户管理、文件审批和数据看板，让不同组织能够在清晰边界内安全协作。',
    ],
    secondaryTitle: '开放、可靠并可持续扩展',
    secondaryParagraph:
      '现代技术架构与开放 API 支撑多地区、多角色和多业务场景，为全球贸易网络的持续增长提供稳定基础。',
  },
};

const MissionContent = ({ content }) => (
  <Stack sx={{ gap: 2 }}>
    <Typography variant="h6">{content.title}</Typography>
    {content.paragraphs.map((paragraph) => (
      <Typography key={paragraph} variant="body2" sx={{ color: 'text.secondary' }}>
        {paragraph}
      </Typography>
    ))}
    <Typography variant="h6">{content.secondaryTitle}</Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {content.secondaryParagraph}
    </Typography>
  </Stack>
);
const OurMission = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'transparent',
        ...sx,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1000, px: { xs: 0 }, py: { xs: 5, sm: 8 } }}>
        <Grid container>
          <Grid
            size={6}
            sx={{
              py: 5,
              display: { xs: 'none', md: 'block' },
              position: 'sticky',
              top: 96,
              alignSelf: 'flex-start',
              height: 'fit-content',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 1,
                transform: 'translateX(40px)',
                aspectRatio: '16/12',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                boxShadow: (theme) => theme.vars.shadows[4],
                overflow: 'hidden',
              }}
            >
              <Image
                src={{
                  light: `${import.meta.env.BASE_URL}images/landing/hero/1-dark-zh-ffax.png`,
                  dark: `${import.meta.env.BASE_URL}images/landing/hero/1-dark-zh-ffax.png`,
                }}
                alt="FFA-X 中文工作台静态预览"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 'auto',
                  minHeight: 1,
                  objectFit: 'cover',
                  objectPosition: 'top left',
                  bgcolor: 'background.default',
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: 1,
                width: 1,
                position: 'relative',
                zIndex: 10,
                bgcolor: 'transparent',
                p: { xs: 3, md: 5 },
              }}
            >
              <SectionHeader
                subtitle={translateUi(
                  'ui.sections.landing.about_us.ourmission.on_a_mission_to_empower_remote_teams_1918e7ce',
                )}
                title={translateUi(
                  'ui.sections.landing.about_us.ourmission.more_about_us_a948eeb6',
                )}
                sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 5 }}
              />

              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  <Tab
                    label={translateUi('ui.sections.landing.about_us.ourmission.our_goal_042bf01a')}
                    value="1"
                  />
                  <Tab
                    label={translateUi(
                      'ui.sections.landing.about_us.ourmission.our_approach_f09011b0',
                    )}
                    value="2"
                  />
                  <Tab
                    label={translateUi(
                      'ui.sections.landing.about_us.ourmission.our_strength_a8c57bd5',
                    )}
                    value="3"
                  />
                </TabList>
                <TabPanel value="1" sx={{ px: 0 }}>
                  <MissionContent content={missionContent[1]} />
                </TabPanel>
                <TabPanel value="2" sx={{ px: 0 }}>
                  <MissionContent content={missionContent[2]} />
                </TabPanel>
                <TabPanel value="3" sx={{ px: 0 }}>
                  <MissionContent content={missionContent[3]} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default OurMission;
