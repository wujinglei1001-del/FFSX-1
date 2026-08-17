import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';

const WorkspaceCustomize = () => {
  const { setSettingsPanelConfig } = useSettingsPanelContext();
  const navigate = useNavigate();

  const openSettings = () => setSettingsPanelConfig({ openSettingPanel: true });

  useEffect(() => {
    openSettings();
  }, []);

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 1100 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ md: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            模板与布局
          </Typography>
          <Typography color="text.secondary">
            在工作台内调整主题、导航布局、侧边栏形式、导航颜色和字体。
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<IconifyIcon icon="material-symbols:tune-rounded" />}
          onClick={openSettings}
        >
          打开设置面板
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4 }}>
        {[
          ['主题模板', '在浅色、深色及模板预设中切换。'],
          ['导航布局', '切换侧边导航、顶部导航和组合布局。'],
          ['工作台外观', '调整导航颜色、形状、字体和无障碍模式。'],
        ].map(([title, description]) => (
          <Paper key={title} variant="outlined" sx={{ p: 3, flex: 1, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Button onClick={() => navigate(paths.myWorkspace)} color="neutral" sx={{ mt: 3 }}>
        返回我的工作台
      </Button>
    </Box>
  );
};

export default WorkspaceCustomize;
