import { users } from 'data/users';
import i18n from 'locales/i18n';

export const feedbacks = [
  {
    id: 1,
    user: { ...users[4], empId: 'EMP001', designation: 'Software Engineer' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.shows_strong_ownership_of_tasks_and_follows_through__a97a432a',
      );
    },
    rating: 3,
    assessment: 'Received',
  },
  {
    id: 2,
    user: { ...users[3], empId: 'EMP002', designation: 'Marketing Intern' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.demonstrates_excellent_problem_solving_skills_and_ta_955fba8e',
      );
    },
    rating: 4,
    assessment: 'Received',
  },
  {
    id: 3,
    user: { ...users[7], empId: 'EMP003', designation: 'Software Tester' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.communicates_clearly_and_effectively_with_both_team__0dc1bb1c',
      );
    },
    rating: 4,
    assessment: 'Received',
  },
  {
    id: 4,
    user: { ...users[6], empId: 'EMP004', designation: 'Frontend Developer' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.sometimes_hesitates_to_take_initiative_more_confiden_ef72b113',
      );
    },
    rating: 3,
    assessment: 'Received',
  },
  {
    id: 5,
    user: { ...users[2], empId: 'EMP005', designation: 'Graphics Designer' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.demonstrates_a_strong_ability_to_consistently_meet_d_71c98ea4',
      );
    },
    rating: 5,
    assessment: 'Received',
  },
  {
    id: 6,
    user: { ...users[14], empId: 'EMP006', designation: 'Team Lead' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.communicates_clearly_and_effectively_with_both_team__0dc1bb1c',
      );
    },
    rating: 3,
    assessment: 'Received',
  },
  {
    id: 7,
    user: { ...users[12], empId: 'EMP007', designation: 'Software Manager' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.should_focus_on_improving_documentation_and_clarity__f4d6e7f7',
      );
    },
    rating: 3,
    assessment: 'Received',
  },
  {
    id: 8,
    user: { ...users[11], empId: 'EMP008', designation: 'Data Analyst' },
    appraisalType: 'Annual review for 2024',
    date: new Date(2025, 1, 12),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.consistently_shares_innovative_ideas_and_suggestions_35ac6460',
      );
    },
    rating: 3,
    assessment: 'Received',
  },

  {
    id: 9,
    user: { ...users[1], empId: 'EMP009', designation: 'HR Executive' },
    appraisalType: 'Quarterly Review Q1 - 2025',
    date: new Date(2025, 2, 8),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.provided_constructive_feedback_and_maintained_profes_b939073b',
      );
    },
    rating: 4,
    assessment: 'Given',
  },
  {
    id: 10,
    user: { ...users[5], empId: 'EMP010', designation: 'Backend Developer' },
    appraisalType: 'Quarterly Review Q1 - 2025',
    date: new Date(2025, 2, 8),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.offered_helpful_insights_during_code_reviews_and_sup_b3cd5d8f',
      );
    },
    rating: 5,
    assessment: 'Given',
  },
  {
    id: 11,
    user: { ...users[9], empId: 'EMP011', designation: 'Project Manager' },
    appraisalType: 'Quarterly Review Q2 - 2025',
    date: new Date(2025, 5, 15),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.delivered_fair_and_detailed_evaluations_that_helped__79d70920',
      );
    },
    rating: 4,
    assessment: 'Given',
  },
  {
    id: 12,
    user: { ...users[8], empId: 'EMP012', designation: 'Business Analyst' },
    appraisalType: 'Quarterly Review Q2 - 2025',
    date: new Date(2025, 5, 15),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.provides_thoughtful_and_balanced_feedback_that_suppo_3529d81e',
      );
    },
    rating: 3,
    assessment: 'Given',
  },
  {
    id: 13,
    user: { ...users[10], empId: 'EMP013', designation: 'UI/UX Designer' },
    appraisalType: 'Quarterly Review Q3 - 2025',
    date: new Date(2025, 8, 2),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.gave_clear_design_related_feedback_that_helped_impro_ded2a5f1',
      );
    },
    rating: 5,
    assessment: 'Given',
  },
  {
    id: 14,
    user: { ...users[0], empId: 'EMP014', designation: 'Intern' },
    appraisalType: 'Quarterly Review Q3 - 2025',
    date: new Date(2025, 8, 2),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.provided_sincere_feedback_with_noticeable_attention__67ebb121',
      );
    },
    rating: 4,
    assessment: 'Given',
  },
  {
    id: 15,
    user: { ...users[13], empId: 'EMP015', designation: 'Network Engineer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 6, 21),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.gave_practical_and_solution_oriented_feedback_relate_584d1d0c',
      );
    },
    rating: 4,
    assessment: 'Given',
  },
  {
    id: 16,
    user: { ...users[16], empId: 'EMP016', designation: 'QA Lead' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 6, 21),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.provided_comprehensive_testing_related_feedback_to_i_5f4e8956',
      );
    },
    rating: 5,
    assessment: 'Given',
  },
  {
    id: 17,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 1, 30),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.improved_time_management_and_learned_new_design_tool_17e9eac2',
      );
    },
    rating: 4,
    assessment: 'Self Assessment',
  },
  {
    id: 18,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 1, 30),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.strengthened_test_case_documentation_and_adopted_bet_72aa9e6b',
      );
    },
    rating: 3,
    assessment: 'Self Assessment',
  },
  {
    id: 19,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 1, 30),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.enhanced_backend_knowledge_and_contributed_to_multip_befacd5f',
      );
    },
    rating: 4,
    assessment: 'Self Assessment',
  },
  {
    id: 20,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 3, 10),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.improved_sprint_planning_accuracy_and_developed_bett_431a4d64',
      );
    },
    rating: 5,
    assessment: 'Self Assessment',
  },
  {
    id: 21,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 3, 10),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.focused_on_enhancing_team_communication_and_strategi_a74fa5b7',
      );
    },
    rating: 4,
    assessment: 'Self Assessment',
  },
  {
    id: 22,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 3, 10),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.strengthened_data_visualization_techniques_and_autom_f644f8af',
      );
    },
    rating: 5,
    assessment: 'Self Assessment',
  },
  {
    id: 23,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 3, 10),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.improved_accessibility_practices_and_optimized_ui_co_70e9a276',
      );
    },
    rating: 4,
    assessment: 'Self Assessment',
  },
  {
    id: 24,
    user: { ...users[2], empId: 'EMP017', designation: 'Graphics Designer' },
    appraisalType: 'Mid-Year Review - 2025',
    date: new Date(2025, 3, 10),
    get message() {
      return i18n.t(
        'ui.data.hrm.performance_management.feedback.developed_stronger_documentation_habits_and_improved_63f8a1ef',
      );
    },
    rating: 3,
    assessment: 'Self Assessment',
  },
];
