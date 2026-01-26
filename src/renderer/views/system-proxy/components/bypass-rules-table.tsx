import { defineComponent, ref, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ProxyBypassRule } from '../../../../shared/common-types';
import BnTable from '../../../components/bn-table/bn-table';
import { BnInput } from '../../../components/bn-input';
import { BnTableColumn } from '../../../components/bn-table/types';
import Icon from '../../../components/bn-icon/icon';
import styles from './bypass-rules-table.module.scss';

export default defineComponent({
  name: 'BypassRulesTable',
  props: {
    rules: {
      type: Array as PropType<ProxyBypassRule[]>,
      required: true
    },
    onAdd: {
      type: Function as PropType<(address: string, description?: string) => void>,
      required: true
    },
    onRemove: {
      type: Function as PropType<(ruleId: string) => void>,
      required: true
    },
    onUpdate: {
      type: Function as PropType<(ruleId: string, updates: Partial<ProxyBypassRule>) => void>,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n();
    const newAddress = ref('');
    const newDescription = ref('');
    const editingId = ref<string | null>(null);
    const editAddress = ref('');
    const editDescription = ref('');

    const handleAdd = () => {
      if (newAddress.value.trim()) {
        props.onAdd(newAddress.value.trim(), newDescription.value.trim() || undefined);
        newAddress.value = '';
        newDescription.value = '';
      }
    };

    const startEdit = (rule: ProxyBypassRule) => {
      editingId.value = rule.id;
      editAddress.value = rule.address;
      editDescription.value = rule.description || '';
    };

    const saveEdit = () => {
      if (editingId.value && editAddress.value.trim()) {
        props.onUpdate(editingId.value, {
          address: editAddress.value.trim(),
          description: editDescription.value.trim() || undefined
        });
        cancelEdit();
      }
    };

    const cancelEdit = () => {
      editingId.value = null;
      editAddress.value = '';
      editDescription.value = '';
    };

    const handleRemove = (ruleId: string) => {
      if (confirm(t('proxy.confirm_delete'))) {
        props.onRemove(ruleId);
      }
    };

    const toggleEnabled = (rule: ProxyBypassRule) => {
      props.onUpdate(rule.id, { enabled: !rule.enabled });
    };

    const formatDate = (timestamp: number) => {
      return new Date(timestamp).toLocaleString();
    };

    const columns: BnTableColumn<ProxyBypassRule>[] = [
      {
        key: 'address',
        title: t('proxy.address'),
        sortable: true,
        render: (_, row) => {
          if (editingId.value === row.id) {
            return (
              <BnInput
                modelValue={editAddress.value}
                onUpdate:modelValue={(val: string) => (editAddress.value = val)}
                placeholder={t('proxy.address')}
                block
              />
            );
          }
          return <span>{row.address}</span>;
        }
      },
      {
        key: 'description',
        title: t('proxy.description'),
        render: (_, row) => {
          if (editingId.value === row.id) {
            return (
              <BnInput
                modelValue={editDescription.value}
                onUpdate:modelValue={(val: string) => (editDescription.value = val)}
                placeholder={t('proxy.description')}
                block
              />
            );
          }
          return <span>{row.description || '-'}</span>;
        }
      },
      {
        key: 'enabled',
        title: t('proxy.rule_enabled'),
        width: '100px',
        render: (_, row) => (
          <input
            type="checkbox"
            checked={row.enabled}
            onChange={() => toggleEnabled(row)}
            disabled={editingId.value === row.id}
          />
        )
      },
      {
        key: 'createdAt',
        title: t('proxy.created_at'),
        width: '180px',
        sortable: true,
        render: (val) => formatDate(val as number)
      },
      {
        key: 'actions',
        title: t('table.actions'),
        width: '120px',
        render: (_, row) => {
          if (editingId.value === row.id) {
            return (
              <div class={styles.actionButtons}>
                <button class="btn-icon" onClick={saveEdit} title={t('common.save')}>
                  <Icon name="check" size={16} />
                </button>
                <button class="btn-icon" onClick={cancelEdit} title="Cancel">
                  <Icon name="x" size={16} />
                </button>
              </div>
            );
          }
          return (
            <div class={styles.actionButtons}>
              <button class="btn-icon" onClick={() => startEdit(row)} title={t('proxy.edit')}>
                <Icon name="pencil" size={16} />
              </button>
              <button class="btn-icon" onClick={() => handleRemove(row.id)} title={t('proxy.delete')}>
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          );
        }
      }
    ];

    return () => (
      <div class={styles.container}>
        <div class={styles.addSection}>
          <div class={styles.inputGroup}>
            <BnInput
              modelValue={newAddress.value}
              onUpdate:modelValue={(val: string) => (newAddress.value = val)}
              placeholder={t('proxy.bypass_placeholder')}
              block
            />
          </div>
          <div class={styles.inputGroup}>
            <BnInput
              modelValue={newDescription.value}
              onUpdate:modelValue={(val: string) => (newDescription.value = val)}
              placeholder={t('proxy.description')}
              block
            />
          </div>
          <button class={styles.addButton} onClick={handleAdd}>
            {t('proxy.add_rule')}
          </button>
        </div>
        <BnTable
          columns={columns}
          data={props.rules}
          pagination={{ enable: true, pageSize: 10 }}
          height="400px"
        />
      </div>
    );
  }
});
